import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FloatingParticles from '../FloatingParticles'

const RESPONSIVE_CSS = `
  .sc-body { max-width:1100px; margin:0 auto; padding:44px 28px 100px; }
  .sc-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:28px; align-items:start; }
  .sc-toggle-btn { padding:11px 38px; }
  .sc-card { background:#fff; border-radius:22px; padding:30px 28px; box-shadow:0 6px 32px rgba(26,75,115,0.09); border:1.5px solid #e8f0fb; }
  .sc-hero { padding:60px 24px 72px; }
  .sc-hero h1 { font-size:clamp(2rem,4.5vw,3.2rem); }
  .sc-hero p { font-size:1.05rem; }
  .sc-summary { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
  .sc-calc-btn { flex:1; padding:16px; font-size:1.05rem; }
  .sc-reset-btn { padding:16px 24px; font-size:0.97rem; }
  @media (max-width:768px) {
    .sc-body { padding:28px 16px 80px; }
    .sc-grid { grid-template-columns:1fr; gap:20px; }
    .sc-toggle-btn { padding:10px 24px; font-size:0.88rem; }
    .sc-card { padding:22px 18px; border-radius:18px; }
    .sc-hero { padding:40px 16px 52px; }
    .sc-hero h1 { font-size:clamp(1.6rem,6vw,2.2rem); }
    .sc-hero p { font-size:0.95rem; }
    .sc-summary { grid-template-columns:1fr 1fr 1fr; gap:8px; }
    .sc-calc-btn { font-size:0.97rem; padding:14px; }
    .sc-reset-btn { padding:14px 18px; font-size:0.9rem; }
  }
  @media (max-width:480px) {
    .sc-body { padding:20px 12px 60px; }
    .sc-toggle-btn { padding:9px 18px; font-size:0.82rem; }
    .sc-card { padding:18px 14px; border-radius:16px; }
    .sc-hero { padding:32px 14px 44px; }
    .sc-summary { grid-template-columns:1fr 1fr 1fr; gap:6px; }
    .sc-calc-btn { font-size:0.92rem; padding:13px; }
    .sc-reset-btn { padding:13px 14px; font-size:0.85rem; }
  }
`

const fmt = (n) =>
  Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

function Field({ label, value, onChange, sublabel }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <label style={{ fontSize: '0.93rem', fontWeight: 700, color: '#317FA4', letterSpacing: '0.01em' }}>{label}</label>
        {sublabel && <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, fontStyle: 'italic' }}>{sublabel}</span>}
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? '#317FA4' : '#64748b', fontWeight: 800, fontSize: '1rem', transition: 'color 0.2s' }}>₹</span>
        <input
          type="number" min="0" value={value || ''}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0"
          style={{
            width: '100%', padding: '13px 14px 13px 32px',
            border: `2px solid ${focused ? '#317FA4' : '#e2e8f0'}`,
            borderRadius: 12, fontSize: '1rem', background: focused ? '#f0f6fc' : '#fafbfc',
            outline: 'none', color: '#317FA4', fontWeight: 700,
            boxShadow: focused ? '0 0 0 4px rgba(26,75,115,0.10)' : '0 1px 3px rgba(0,0,0,0.04)',
            transition: 'all 0.2s', boxSizing: 'border-box',
          }}
        />
      </div>
    </div>
  )
}

function Bar({ label, amount, total, color }) {
  const pct = total > 0 ? Math.min((amount / total) * 100, 100) : 0
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.88rem' }}>
        <span style={{ color: '#475569', fontWeight: 600 }}>{label}</span>
        <span style={{ color: '#317FA4', fontWeight: 800 }}>₹{fmt(amount)}</span>
      </div>
      <div style={{ height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.7s cubic-bezier(.4,0,.2,1)' }} />
      </div>
    </div>
  )
}

export default function SalaryCalculator() {
  const [mode, setMode] = useState('monthly') // monthly | yearly

  // Earnings
  const [basic,      setBasic]      = useState('')
  const [hra,        setHra]        = useState('')
  const [allowance,  setAllowance]  = useState('')
  const [bonus,      setBonus]      = useState('')

  // Deductions
  const [pf,         setPf]         = useState('')
  const [tax,        setTax]        = useState('')
  const [otherDed,   setOtherDed]   = useState('')

  const [result, setResult] = useState(null)

  const parse = v => Number(v) || 0

  const calculate = () => {
    const mult = mode === 'yearly' ? 1 : 12

    const gross = (parse(basic) + parse(hra) + parse(allowance) + parse(bonus)) * mult
    const totalDed = (parse(pf) + parse(tax) + parse(otherDed)) * mult
    const net = gross - totalDed
    const monthly = {
      gross: gross / (mode === 'yearly' ? 12 : 1),
      totalDed: totalDed / (mode === 'yearly' ? 12 : 1),
      net: net / (mode === 'yearly' ? 12 : 1),
    }
    setResult({ gross, totalDed, net, monthly, mode,
      breakdown: {
        basic:     parse(basic)     * mult,
        hra:       parse(hra)       * mult,
        allowance: parse(allowance) * mult,
        bonus:     parse(bonus)     * mult,
        pf:        parse(pf)        * mult,
        tax:       parse(tax)       * mult,
        otherDed:  parse(otherDed)  * mult,
      }
    })
  }

  const reset = () => {
    setBasic(''); setHra(''); setAllowance(''); setBonus('')
    setPf(''); setTax(''); setOtherDed(''); setResult(null)
  }

  return (
    <div style={{ background: 'linear-gradient(160deg,#f0f6fc 0%,#f8fafc 60%,#e8f4fb 100%)', minHeight: '100vh', fontFamily: 'system-ui,sans-serif' }}>
      <style>{RESPONSIVE_CSS}</style>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="sc-hero" style={{
        background: 'linear-gradient(135deg,#317FA4 0%,#317FA4 55%,#2563a8 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <FloatingParticles color="#3385AA" count={30} opacity={0.5} />
        <div style={{ position:'absolute', top:-60, right:-60, width:340, height:340, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
        <div style={{ position:'absolute', bottom:-80, left:-40, width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
        <div style={{ position:'absolute', top:'30%', left:'10%', width:120, height:120, borderRadius:'50%', background:'rgba(99,179,237,0.08)' }} />
        <div style={{ position:'relative', maxWidth:660, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:40, padding:'6px 18px', marginBottom:22 }}>
            <span style={{ fontSize:'1.1rem' }}>💰</span>
            <span style={{ color:'rgba(255,255,255,0.9)', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.08em' }}>SALARY CALCULATOR</span>
          </div>
          <h1 className="sc-hero-h1" style={{ fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:16, letterSpacing:'-0.02em' }}>
            Know Your Exact
            <span style={{ display:'block', background:'linear-gradient(90deg,#63b3ed,#90cdf4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>In-Hand Salary</span>
          </h1>
          <p className="sc-hero-p" style={{ color:'rgba(255,255,255,0.72)', lineHeight:1.75, maxWidth:520, margin:'0 auto' }}>
            Calculate your take-home pay with all allowances, deductions, PF and tax accounted for.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR BODY ───────────────────────────────── */}
      <div className="sc-body">

        {/* ── TOGGLE — centered ────────────────────────── */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
          <div style={{ display:'inline-flex', background:'#fff', borderRadius:50, padding:5, border:'2px solid #e2e8f0', boxShadow:'0 4px 16px rgba(26,75,115,0.10)' }}>
            {['monthly','yearly'].map(m => (
              <button key={m} className="sc-toggle-btn" onClick={() => { setMode(m); setResult(null) }} style={{
                borderRadius:44, border:'none', cursor:'pointer',
                background: mode===m ? 'linear-gradient(90deg,#317FA4,#2563a8)' : 'transparent',
                color: mode===m ? '#fff' : '#64748b',
                fontWeight: mode===m ? 800 : 600,
                transition: 'all 0.22s', textTransform:'capitalize',
                boxShadow: mode===m ? '0 4px 16px rgba(26,75,115,0.28)' : 'none',
                letterSpacing: '0.01em',
              }}>{m === 'monthly' ? '📅 Monthly' : '📆 Yearly'}</button>
            ))}
          </div>
        </div>

        <div className="sc-grid">

        {/* ── LEFT: INPUTS ────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Earnings */}
          <div className="sc-card" style={{ borderTop: '4px solid #317FA4' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, paddingBottom:18, borderBottom:'1.5px solid #f0f6fc' }}>
              <div style={{ width:44, height:44, borderRadius:14, background:'linear-gradient(135deg,#317FA4,#2563a8)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(26,75,115,0.25)' }}>
                <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.08rem', letterSpacing:'-0.01em' }}>Salary Earnings</div>
                <div style={{ fontSize:'0.8rem', color:'#64748b', marginTop:2 }}>Add all your income components</div>
              </div>
            </div>
            <Field label="Basic Salary"   value={basic}     onChange={setBasic}     sublabel="Base pay" />
            <Field label="HRA"            value={hra}       onChange={setHra}       sublabel="House Rent Allowance" />
            <Field label="Other Allowances" value={allowance} onChange={setAllowance} sublabel="Transport, medical etc." />
            <Field label="Bonus"          value={bonus}     onChange={setBonus}     sublabel="Performance / annual" />
          </div>

          {/* Deductions */}
          <div className="sc-card" style={{ borderTop: '4px solid #e11d48' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, paddingBottom:18, borderBottom:'1.5px solid #fff0f6' }}>
              <div style={{ width:44, height:44, borderRadius:14, background:'linear-gradient(135deg,#be185d,#e11d48)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(225,29,72,0.22)' }}>
                <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.08rem', letterSpacing:'-0.01em' }}>Deductions</div>
                <div style={{ fontSize:'0.8rem', color:'#64748b', marginTop:2 }}>PF, Tax and other deductions</div>
              </div>
            </div>
            <Field label="Provident Fund (PF)" value={pf}       onChange={setPf}       sublabel="12% of basic" />
            <Field label="Income Tax"          value={tax}      onChange={setTax}      sublabel="TDS / advance tax" />
            <Field label="Other Deductions"    value={otherDed} onChange={setOtherDed} sublabel="ESI, loan EMI etc." />
          </div>

          {/* Action buttons */}
          <div style={{ display:'flex', gap:14 }}>
            <button className="sc-calc-btn" onClick={calculate} style={{
              flex:1, background:'linear-gradient(90deg,#317FA4,#2563a8)',
              border:'none', borderRadius:16, fontWeight:800, color:'#fff',
              cursor:'pointer', boxShadow:'0 8px 24px rgba(26,75,115,0.32)',
              letterSpacing:'0.01em', transition:'transform 0.15s,box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(26,75,115,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(26,75,115,0.32)' }}
            >Calculate Salary</button>
            <button className="sc-reset-btn" onClick={reset} style={{
              background:'#fff', border:'2px solid #e2e8f0',
              borderRadius:16, fontWeight:700, color:'#64748b', cursor:'pointer',
              transition:'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#317FA4'; e.currentTarget.style.color='#317FA4' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.color='#64748b' }}
            >Reset</button>
          </div>
        </div>

        {/* ── RIGHT: RESULT ──────────────────────────────── */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

          {!result ? (
            /* Placeholder */
            <div className="sc-card" style={{ textAlign:'center', padding:'60px 28px', background:'linear-gradient(150deg,#f0f6fc,#fff)' }}>
              <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#317FA4,#2563a8)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px', boxShadow:'0 8px 24px rgba(26,75,115,0.22)' }}>
                <svg width="36" height="36" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
              </div>
              <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.2rem', marginBottom:10 }}>Enter your salary details</div>
              <p style={{ color:'#94a3b8', fontSize:'0.92rem', lineHeight:1.8, margin:'0 auto', maxWidth:300 }}>
                Fill in the earnings and deductions on the left, then click <strong style={{color:'#317FA4'}}>Calculate Salary</strong> to see your in-hand pay breakdown.
              </p>
            </div>
          ) : (
            <>
              {/* NET SALARY CARD */}
              <div style={{
                background:'linear-gradient(135deg,#317FA4 0%,#317FA4 55%,#2563a8 100%)',
                borderRadius:20, padding:'26px 24px', textAlign:'center',
                boxShadow:'0 8px 30px rgba(26,75,115,0.3)', position:'relative', overflow:'hidden',
              }}>
                <div style={{ position:'absolute', top:-30, right:-30, width:130, height:130, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
                <div style={{ position:'absolute', bottom:-20, left:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
                <div style={{ position:'relative' }}>
                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.12)', borderRadius:30, padding:'4px 14px', marginBottom:12 }}>
                    <span style={{ fontSize:'0.7rem', fontWeight:700, color:'rgba(255,255,255,0.8)', letterSpacing:'0.1em', textTransform:'uppercase' }}>Net In-Hand ({result.mode})</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:4, marginBottom:5 }}>
                    <span style={{ fontSize:'1.3rem', fontWeight:800, color:'#86efac', lineHeight:1 }}>₹</span>
                    <span style={{ fontSize:'clamp(1.8rem,5vw,2.6rem)', fontWeight:900, color:'#4ade80', lineHeight:1, letterSpacing:'-0.02em' }}>{fmt(result.net)}</span>
                  </div>
                  <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.5)', marginBottom:10 }}>After all deductions</div>
                  {result.mode === 'yearly' && (
                    <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', borderRadius:12, padding:'8px 16px' }}>
                      <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.78rem' }}>Monthly take-home:</span>
                      <span style={{ color:'#fff', fontWeight:800, fontSize:'0.9rem' }}>₹{fmt(result.monthly.net)}</span>
                    </div>
                  )}
                  {result.mode === 'monthly' && (
                    <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', borderRadius:12, padding:'8px 16px' }}>
                      <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.78rem' }}>Annual CTC:</span>
                      <span style={{ color:'#fff', fontWeight:800, fontSize:'0.9rem' }}>₹{fmt(result.net * 12)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* SUMMARY 3 cells */}
              <div className="sc-summary">
                {[
                  { label:'Gross', value: result.gross, color:'#317FA4', bg:'#f5f8fc', border:'#e2e8f0',
                    icon: <svg width="18" height="18" fill="none" stroke="#317FA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> },
                  { label:'Deductions', value: result.totalDed, color:'#be185d', bg:'#fef0f5', border:'#e2e8f0',
                    icon: <svg width="18" height="18" fill="none" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
                  { label:'Net Salary', value: result.net, color:'#16a34a', bg:'#f0fdf4', border:'#e2e8f0',
                    icon: <svg width="18" height="18" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> },
                ].map((s,i) => (
                  <div key={i} style={{ background:s.bg, borderRadius:14, padding:'14px 8px', textAlign:'center', border:`1.5px solid ${s.border}` }}>
                    <div style={{ width:34, height:34, borderRadius:10, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', boxShadow:`0 2px 8px ${s.color}18` }}>{s.icon}</div>
                    <div style={{ fontSize:'0.67rem', color:'#94a3b8', fontWeight:700, marginBottom:5, textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</div>
                    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'center', gap:2 }}>
                      <span style={{ fontWeight:700, color:s.color, fontSize:'0.72rem' }}>₹</span>
                      <span style={{ fontWeight:900, color:s.color, fontSize:'clamp(0.95rem,2vw,1.1rem)' }}>{fmt(s.value)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* BREAKDOWN BARS */}
              <div className="sc-card" style={{ borderTop:'4px solid #317FA4' }}>
                <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.05rem', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:'1.2rem' }}>📊</span> Earnings Breakdown
                </div>
                <Bar label="Basic Salary"     amount={result.breakdown.basic}     total={result.gross} color="linear-gradient(90deg,#317FA4,#2563a8)" />
                <Bar label="HRA"              amount={result.breakdown.hra}       total={result.gross} color="linear-gradient(90deg,#0f766e,#14b8a6)" />
                <Bar label="Other Allowances" amount={result.breakdown.allowance} total={result.gross} color="linear-gradient(90deg,#7c3aed,#a855f7)" />
                <Bar label="Bonus"            amount={result.breakdown.bonus}     total={result.gross} color="linear-gradient(90deg,#b45309,#f97316)" />
              </div>

              <div className="sc-card" style={{ borderTop:'4px solid #e11d48' }}>
                <div style={{ fontWeight:800, color:'#317FA4', fontSize:'1.05rem', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:'1.2rem' }}>📉</span> Deductions Breakdown
                </div>
                <Bar label="Provident Fund (PF)"  amount={result.breakdown.pf}       total={result.gross} color="linear-gradient(90deg,#be185d,#f43f5e)" />
                <Bar label="Income Tax"           amount={result.breakdown.tax}      total={result.gross} color="linear-gradient(90deg,#dc2626,#ef4444)" />
                <Bar label="Other Deductions"     amount={result.breakdown.otherDed} total={result.gross} color="linear-gradient(90deg,#64748b,#94a3b8)" />

                {/* Take-home percentage */}
                <div style={{ marginTop:18, padding:'14px 18px', background:'linear-gradient(90deg,#f0f6fc,#e8f4fb)', borderRadius:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1.5px solid #dbeafe' }}>
                  <div>
                    <div style={{ fontSize:'0.85rem', fontWeight:600, color:'#64748b' }}>Take-home percentage</div>
                    <div style={{ fontSize:'0.75rem', color:'#94a3b8', marginTop:2 }}>Of your gross salary</div>
                  </div>
                  <span style={{ fontWeight:900, color:'#16a34a', fontSize:'1.3rem' }}>
                    {result.gross > 0 ? ((result.net / result.gross) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>

              {/* Tip */}
              <div style={{ background:'linear-gradient(135deg,#317FA4,#317FA4)', borderRadius:20, padding:'22px 26px', display:'flex', gap:14, alignItems:'flex-start', boxShadow:'0 6px 24px rgba(15,45,71,0.25)' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:'rgba(255,215,0,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:'1.4rem' }}>💡</span>
                </div>
                <div>
                  <div style={{ fontWeight:800, color:'#FFD700', fontSize:'0.95rem', marginBottom:7, letterSpacing:'0.02em' }}>Pro Tip</div>
                  <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.88rem', lineHeight:1.8, margin:0 }}>
                    Your PF contribution is <strong style={{color:'#90cdf4'}}>{result.gross > 0 ? ((result.breakdown.pf / result.gross) * 100).toFixed(1) : 0}%</strong> of gross. The employer also adds an equal PF amount. Negotiate a higher in-hand by reducing voluntary PF contributions.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
