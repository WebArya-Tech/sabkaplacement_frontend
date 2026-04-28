import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const calcTax = (annual) => {
  let tax = 0;
  // New Tax Regime Slabs (Simplified for calculator)
  if (annual <= 300000) tax = 0;
  else if (annual <= 600000) tax = (annual - 300000) * 0.05;
  else if (annual <= 900000) tax = 15000 + (annual - 600000) * 0.1;
  else if (annual <= 1200000) tax = 45000 + (annual - 900000) * 0.15;
  else if (annual <= 1500000) tax = 90000 + (annual - 1200000) * 0.2;
  else tax = 150000 + (annual - 1500000) * 0.3;
  
  return Math.round(tax + tax * 0.04); // Including 4% Cess
};

const InputField = ({ label, hint, value, onChange, readOnly = false }) => (
  <div className="mb-5">
    <div className="flex justify-between items-center mb-2">
      <label className="font-semibold text-[#1a3c5e] text-sm">{label}</label>
      <span className="text-xs text-gray-400 italic">{hint}</span>
    </div>
    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-teal-400 transition">
      <span className="text-gray-400 mr-2 text-sm">₹</span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        min={0}
        placeholder="0"
        className="flex-1 bg-transparent outline-none text-gray-500 text-sm w-full"
      />
    </div>
  </div>
);

export default function SalaryCalculator() {
  const [mode, setMode] = useState("monthly");
  const [basicSalary, setBasicSalary] = useState("");
  const [hra, setHra] = useState("");
  const [allowances, setAllowances] = useState("");
  const [bonus, setBonus] = useState("");
  const [pf, setPf] = useState("");
  const [incomeTax, setIncomeTax] = useState("");
  const [otherDed, setOtherDed] = useState("");
  const [result, setResult] = useState(null);

  const toNum = (v) => parseFloat(v) || 0;

  const calculate = () => {
    const mult = mode === "monthly" ? 12 : 1;

    const annualBasic = toNum(basicSalary) * mult;
    const annualHra = toNum(hra) * mult;
    const annualAllowances = toNum(allowances) * mult;
    const annualBonus = toNum(bonus) * mult;

    const grossAnnual = annualBasic + annualHra + annualAllowances + annualBonus;

    // Auto-calc PF if not manually entered (12% of basic, capped at 1800/month or as per rules)
    // Here we use user's logic: 12% of basic or 21600 annual cap
    const autoPF = toNum(pf) > 0 
      ? toNum(pf) * mult 
      : Math.min(annualBasic * 0.12, 21600);

    // Auto-calc tax if not manually entered
    const autoTax = toNum(incomeTax) > 0
      ? toNum(incomeTax) * mult
      : calcTax(Math.max(0, grossAnnual - autoPF - 75000)); // 75k standard deduction

    const otherD = toNum(otherDed) * mult;
    const pt = 2400; // Professional Tax

    const totalDed = autoPF + autoTax + otherD + pt;
    const inhand = grossAnnual - totalDed;

    setResult({
      grossAnnual,
      autoPF,
      autoTax,
      otherD,
      pt,
      totalDed,
      inhand,
      monthlyInhand: Math.round(inhand / 12),
    });
  };

  const reset = () => {
    setBasicSalary("");
    setHra("");
    setAllowances("");
    setBonus("");
    setPf("");
    setIncomeTax("");
    setOtherDed("");
    setResult(null);
  };

  const inhandPct = result ? Math.round((result.inhand / result.grossAnnual) * 100) : 0;
  const taxPct = result ? Math.round((result.autoTax / result.grossAnnual) * 100) : 0;
  const pfPct = result ? Math.round((result.autoPF / result.grossAnnual) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <Navbar />
      <div className="p-6">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100">
            {["monthly", "yearly"].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setResult(null); }}
                className={`px-8 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                  mode === m ? "bg-[#1a5276] text-white shadow" : "text-gray-400"
                }`}
              >
                {m === "monthly" ? "📅" : "📆"} {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 border-t-4 border-teal-600 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#1a5276] flex items-center justify-center text-white text-lg">₹</div>
                <div>
                  <h3 className="font-bold text-[#1a3c5e] text-base">Salary Earnings</h3>
                  <p className="text-xs text-gray-400">Add all your income components</p>
                </div>
              </div>
              <InputField label="Basic Salary" hint="Base pay" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} />
              <InputField label="HRA" hint="House Rent Allowance" value={hra} onChange={(e) => setHra(e.target.value)} />
              <InputField label="Other Allowances" hint="Transport, medical etc." value={allowances} onChange={(e) => setAllowances(e.target.value)} />
              <InputField label="Bonus" hint="Performance / annual" value={bonus} onChange={(e) => setBonus(e.target.value)} />
            </div>

            <div className="bg-white rounded-2xl p-6 border-t-4 border-red-400 shadow-sm">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-red-400 flex items-center justify-center text-white text-lg font-bold">−</div>
                <div>
                  <h3 className="font-bold text-[#1a3c5e] text-base">Deductions</h3>
                  <p className="text-xs text-gray-400">PF, Tax and other deductions</p>
                </div>
              </div>
              <InputField label="Provident Fund (PF)" hint="12% of basic (auto if empty)" value={pf} onChange={(e) => setPf(e.target.value)} />
              <InputField label="Income Tax" hint="TDS / advance tax (auto if empty)" value={incomeTax} onChange={(e) => setIncomeTax(e.target.value)} />
              <InputField label="Other Deductions" hint="ESI, loan EMI etc." value={otherDed} onChange={(e) => setOtherDed(e.target.value)} />
              <div className="flex gap-3 mt-6">
                <button onClick={calculate} className="flex-1 bg-[#1a5276] hover:bg-[#154360] text-white font-semibold py-3 rounded-xl transition-all text-sm">Calculate Salary</button>
                <button onClick={reset} className="px-6 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 text-sm font-medium transition">Reset</button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {!result ? (
              <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center justify-center min-h-[320px] text-center">
                <div className="w-16 h-16 rounded-full bg-[#1a5276] flex items-center justify-center text-white text-2xl mb-5">⬇</div>
                <h3 className="text-[#1a5276] font-bold text-lg mb-2">Enter your salary details</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Fill in the earnings and deductions on the left,<br />then click <strong className="text-gray-600">Calculate Salary</strong> to see your in-hand pay breakdown.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="bg-[#eaf4fb] rounded-xl p-6 mb-6 text-center">
                  <p className="text-xs text-[#1a5276] font-bold mb-2 uppercase tracking-widest">Monthly In-Hand Salary</p>
                  <p className="text-4xl font-black text-[#1a5276] mb-2">{fmt(result.monthlyInhand)}</p>
                  <div className="h-px bg-[#1a5276]/10 w-1/2 mx-auto mb-2" />
                  <p className="text-sm text-[#1a5276]/70 font-medium">Annual Net: {fmt(result.inhand)}</p>
                </div>

                <div className="flex h-3 rounded-full overflow-hidden mb-3 bg-gray-100">
                  <div className="bg-teal-500" style={{ width: `${inhandPct}%` }} />
                  <div className="bg-red-400" style={{ width: `${taxPct}%` }} />
                  <div className="bg-blue-400" style={{ width: `${pfPct}%` }} />
                </div>
                
                <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-8">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" />In-hand {inhandPct}%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400" />Tax {taxPct}%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" />PF {pfPct}%</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-gray-500 text-sm font-medium">Gross Annual Salary</span>
                    <span className="text-[#1a3c5e] font-bold">{fmt(result.grossAnnual)}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { label: "Provident Fund (PF)", value: result.autoPF },
                      { label: "Income Tax (TDS)", value: result.autoTax },
                      { label: "Other Deductions", value: result.otherD },
                      { label: "Professional Tax", value: result.pt },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center px-4 py-2">
                        <span className="text-gray-400 text-xs">{item.label}</span>
                        <span className="text-red-400 text-xs font-semibold">− {fmt(item.value)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-[#1a5276] text-white shadow-lg shadow-blue-900/10">
                    <span className="font-bold">Total Annual In-Hand</span>
                    <span className="text-xl font-black">{fmt(result.inhand)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
