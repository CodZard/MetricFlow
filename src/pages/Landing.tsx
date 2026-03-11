import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
          <span className="font-semibold text-gray-900">MetricFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors duration-200">Features</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors duration-200">Pricing</a>
          <a href="#testimonials" className="hover:text-gray-900 transition-colors duration-200">Testimonials</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/auth')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">Sign in</button>
          <button onClick={() => navigate('/auth')} className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200">
            Get Started →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            ⭐ Trusted by 10,000+ teams worldwide
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Analytics platform<br />that drives<br />
            <span className="text-green-400">results</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8">The tools you need to grow your business faster and smarter — all in one place.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/auth')} className="bg-green-500 hover:bg-green-600 hover:scale-105 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200">
              Get Started Free →
            </button>
            <button className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200">
              Schedule a Demo
            </button>
          </div>
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
            <span>✓ 14-day free trial</span>
            <span>✓ No credit card required</span>
          </div>
        </div>

        {/* DASHBOARD MOCKUP */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Total Income', value: '$18,450', bg: 'bg-green-50' },
              { label: 'Total Expense', value: '$12,300', bg: 'bg-red-50' },
              { label: 'Net Profit', value: '$6,150', bg: 'bg-blue-50' },
            ].map(card => (
              <div key={card.label} className={`${card.bg} rounded-xl p-3 hover:scale-105 transition-transform duration-200`}>
                <p className="text-xs text-gray-400">{card.label}</p>
                <p className="text-lg font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1 h-24">
            {[40, 65, 45, 80, 60, 90, 55, 75, 85, 70, 95, 65].map((h, i) => (
              <div key={i} className="flex-1 bg-green-200 hover:bg-green-400 rounded-t-sm transition-colors duration-200" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">Features</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Everything you need to scale</h2>
            <p className="text-gray-500 mt-2">Powerful features designed to help you work smarter, not harder.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Smart Automation', desc: 'Automate repetitive tasks and focus on what matters most.' },
              { icon: '📊', title: 'Real-Time Analytics', desc: 'Get insights instantly with live data dashboards.' },
              { icon: '👥', title: 'Team Collaboration', desc: 'Work together seamlessly with built-in collaboration tools.' },
              { icon: '🛡️', title: 'Secure by Default', desc: 'Enterprise-grade security for peace of mind.' },
              { icon: '🌍', title: 'Global CDN', desc: 'Lightning-fast performance worldwide.' },
              { icon: '🎧', title: '24/7 Support', desc: 'Expert help whenever you need it.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Loved by teams everywhere</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'CEO, TechStart', text: 'MetricFlow transformed how we track our KPIs. The real-time dashboards are incredible.' },
              { name: 'Marcus Lee', role: 'Head of Growth, Scaleup', text: 'Finally an analytics tool that just works. Setup took 5 minutes and the insights are invaluable.' },
              { name: 'Aisha Patel', role: 'Product Manager, Innovate', text: 'The team collaboration features alone are worth it. Our entire team is aligned now.' },
            ].map(t => (
              <div key={t.name} className="bg-gray-50 rounded-xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <p className="text-gray-600 text-sm mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <span className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">Pricing</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Simple, transparent pricing</h2>
            <p className="text-gray-500 mt-2">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { plan: 'Starter', price: '$0', desc: 'Perfect for individuals', features: ['5 dashboards', '1 user', 'Basic analytics', 'Email support'], highlight: false },
              { plan: 'Pro', price: '$29', desc: 'For growing teams', features: ['Unlimited dashboards', '10 users', 'Advanced analytics', 'Priority support', 'API access'], highlight: true },
              { plan: 'Enterprise', price: '$99', desc: 'For large organizations', features: ['Everything in Pro', 'Unlimited users', 'Custom integrations', 'Dedicated support', 'SLA guarantee'], highlight: false },
            ].map(p => (
              <div key={p.plan} className={`rounded-xl p-6 border hover:scale-105 transition-all duration-200 ${p.highlight ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200' : 'bg-white border-gray-100 hover:shadow-md'}`}>
                <h3 className={`font-semibold mb-1 ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.plan}</h3>
                <p className={`text-sm mb-4 ${p.highlight ? 'text-green-100' : 'text-gray-400'}`}>{p.desc}</p>
                <p className={`text-4xl font-bold mb-6 ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.price}<span className="text-sm font-normal">/mo</span></p>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${p.highlight ? 'text-green-100' : 'text-gray-500'}`}>
                      <span className={p.highlight ? 'text-white' : 'text-green-500'}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/auth')}
                  className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${p.highlight ? 'bg-white text-green-600 hover:bg-green-50' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-white font-bold text-xs">M</div>
            <span className="font-semibold text-gray-900 text-sm">MetricFlow</span>
          </div>
          <p className="text-gray-400 text-xs">© 2026 MetricFlow. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}