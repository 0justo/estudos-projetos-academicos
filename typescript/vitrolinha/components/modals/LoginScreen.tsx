'use client'
import { useState, useRef, useEffect } from 'react'
import {
  signInWithEmail, signUpWithEmail, resetPassword,
} from '@/lib/services/auth.service'

interface Props { onLogin: () => void }

type Step = 'welcome' | 'signin' | 'signup' | 'forgot' | 'confirm'

function translateError(msg: string): string {
  if (msg === 'EMAIL_CONFIRM_REQUIRED')           return '__CONFIRM__'
  if (msg.includes('Invalid login credentials'))  return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed'))        return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('User already registered'))    return 'Este e-mail já está cadastrado.'
  if (msg.includes('Password should be'))         return 'Senha mínima: 6 caracteres.'
  if (msg.includes('Unable to validate'))         return 'E-mail inválido.'
  if (msg.includes('over_email_send_rate_limit')) return 'Muitas tentativas. Aguarde alguns minutos.'
  if (msg.includes('Network'))                    return 'Sem conexão. Verifique sua internet.'
  return 'Algo deu errado. Tente novamente.'
}

export default function LoginScreen({ onLogin }: Props) {
  const [step, setStep]             = useState<Step>('welcome')
  const [email, setEmail]           = useState('')
  const [pass, setPass]             = useState('')
  const [name, setName]             = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [forgotSent, setForgotSent] = useState(false)

  const headingRef = useRef<HTMLDivElement>(null)
  useEffect(() => { headingRef.current?.focus() }, [step])

  const clearError = () => setError(null)
  const go = (s: Step) => { clearError(); setStep(s) }

  const handleSignIn = async () => {
    if (!email || !pass) { setError('Preencha e-mail e senha.'); return }
    setLoading(true); clearError()
    try { await signInWithEmail(email, pass); onLogin() }
    catch (e: any) { setError(translateError(e.message)) }
    finally { setLoading(false) }
  }

  const handleSignUp = async () => {
    if (!name || !email || !pass) { setError('Preencha todos os campos.'); return }
    if (pass.length < 6) { setError('Senha mínima: 6 caracteres.'); return }
    setLoading(true); clearError()
    try {
      await signUpWithEmail(email, pass, name)
      onLogin()
    } catch (e: any) {
      const msg = translateError(e.message)
      if (msg === '__CONFIRM__') {
        go('confirm')
      } else {
        setError(msg)
      }
    }
    finally { setLoading(false) }
  }

  const handleForgot = async () => {
    if (!email) { setError('Digite seu e-mail.'); return }
    setLoading(true); clearError()
    try { await resetPassword(email); setForgotSent(true) }
    catch (e: any) { setError(translateError(e.message)) }
    finally { setLoading(false) }
  }

  const errorBox = error ? (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        background: 'rgba(255,60,60,0.12)', border: '0.5px solid rgba(255,60,60,0.3)',
        borderRadius: 8, padding: '9px 12px', marginBottom: 14,
        fontSize: 11, color: '#ff6b6b', fontFamily: 'var(--font-sans)',
      }}
    >
      {error}
    </div>
  ) : null

  return (
    <div className="login-screen" role="main" aria-label="Vitrolinha — entrar ou criar conta">

      {/* WELCOME */}
      {step === 'welcome' && (
        <div className="login-step active" style={{ justifyContent: 'flex-end' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px', animation: 'loginFadeIn 0.6s ease both' }}>
            <h1 className="login-wordmark">VITROLINHA</h1>
            <p className="login-tagline">sua jukebox social. resenhe, descubra, compartilhe.</p>
          </div>
          <div style={{ padding: '0 24px', paddingBottom: 'max(env(safe-area-inset-bottom,0px),40px)', display: 'flex', flexDirection: 'column', gap: 10, animation: 'loginFadeIn 0.6s 0.2s ease both', opacity: 0, animationFillMode: 'forwards' }}>
            <button className="login-cta-primary" onClick={() => go('signup')}>Criar conta grátis</button>
            <button className="login-cta-secondary" onClick={() => go('signin')}>Já tenho conta</button>
          </div>
        </div>
      )}

      {/* SIGN IN */}
      {step === 'signin' && (
        <div className="login-step active" style={{ justifyContent: 'flex-end' }}>
          <div style={{ padding: '0 20px', paddingBottom: 'max(env(safe-area-inset-bottom,0px),32px)', display: 'flex', flexDirection: 'column', animation: 'loginFadeIn 0.35s ease both' }}>
            <button onClick={() => go('welcome')} aria-label="Voltar" style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, fontFamily: 'var(--font-sans)', cursor: 'pointer', textAlign: 'left', marginBottom: 20, padding: 0 }}>← Voltar</button>
            <div ref={headingRef} tabIndex={-1} style={{ fontFamily: 'var(--font-brand)', fontSize: 22, fontWeight: 900, color: '#F2EFE9', letterSpacing: '0.15em', marginBottom: 24 }} role="heading" aria-level={1}>ENTRAR</div>
            {errorBox}
            <label className="login-field">
              <span className="login-field-label">E-MAIL</span>
              <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
            </label>
            <label className="login-field">
              <span className="login-field-label">SENHA</span>
              <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignIn()} autoComplete="current-password" />
            </label>
            <div style={{ height: 8 }} />
            <button className="login-cta-primary" onClick={handleSignIn} disabled={loading} aria-busy={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
            <button onClick={() => go('forgot')} style={{ marginTop: 10, background: 'none', border: 'none', color: '#555', fontSize: 11, fontFamily: 'var(--font-sans)', cursor: 'pointer', letterSpacing: '0.06em' }}>
              Esqueci minha senha
            </button>
          </div>
        </div>
      )}

      {/* SIGN UP */}
      {step === 'signup' && (
        <div className="login-step active" style={{ justifyContent: 'flex-end' }}>
          <div style={{ padding: '0 20px', paddingBottom: 'max(env(safe-area-inset-bottom,0px),32px)', display: 'flex', flexDirection: 'column', animation: 'loginFadeIn 0.35s ease both' }}>
            <button onClick={() => go('welcome')} aria-label="Voltar" style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, fontFamily: 'var(--font-sans)', cursor: 'pointer', textAlign: 'left', marginBottom: 20, padding: 0 }}>← Voltar</button>
            <div ref={headingRef} tabIndex={-1} style={{ fontFamily: 'var(--font-brand)', fontSize: 22, fontWeight: 900, color: '#F2EFE9', letterSpacing: '0.15em', marginBottom: 24 }} role="heading" aria-level={1}>CRIAR CONTA</div>
            {errorBox}
            <label className="login-field">
              <span className="login-field-label">NOME</span>
              <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="login-field">
              <span className="login-field-label">E-MAIL</span>
              <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
            </label>
            <label className="login-field">
              <span className="login-field-label">SENHA</span>
              <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} autoComplete="new-password" />
            </label>
            <div style={{ height: 8 }} />
            <button className="login-cta-primary" onClick={handleSignUp} disabled={loading} aria-busy={loading}>
              {loading ? 'Criando…' : 'Criar conta'}
            </button>
            <p style={{ fontSize: 9, color: '#333', fontFamily: 'var(--font-sans)', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
              Ao criar conta você concorda com os<br />Termos de Uso e Política de Privacidade
            </p>
          </div>
        </div>
      )}

      {/* CONFIRM EMAIL */}
      {step === 'confirm' && (
        <div className="login-step active" style={{ justifyContent: 'center' }}>
          <div style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: 'loginFadeIn 0.35s ease both' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📬</div>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: 20, fontWeight: 900, color: '#F2EFE9', letterSpacing: '0.15em', marginBottom: 14 }}>
              CONFIRME SEU E-MAIL
            </div>
            <p style={{ fontSize: 13, color: '#555', fontFamily: 'var(--font-sans)', lineHeight: 1.65, marginBottom: 8 }}>
              Enviamos um link de confirmação para
            </p>
            <p style={{ fontSize: 13, color: '#F2EFE9', fontFamily: 'var(--font-sans)', fontWeight: 600, marginBottom: 24 }}>
              {email}
            </p>
            <p style={{ fontSize: 11, color: '#444', fontFamily: 'var(--font-sans)', lineHeight: 1.6, marginBottom: 32 }}>
              Abra o e-mail e clique no link para ativar sua conta. Verifique também a pasta de spam.
            </p>
            <button className="login-cta-secondary" onClick={() => go('signin')} style={{ width: '100%' }}>
              Já confirmei — Entrar
            </button>
            <button
              onClick={() => go('welcome')}
              style={{ marginTop: 14, background: 'none', border: 'none', color: '#444', fontSize: 11, fontFamily: 'var(--font-sans)', cursor: 'pointer', letterSpacing: '0.06em' }}
            >
              Voltar ao início
            </button>
          </div>
        </div>
      )}

      {/* FORGOT */}
      {step === 'forgot' && (
        <div className="login-step active" style={{ justifyContent: 'flex-end' }}>
          <div style={{ padding: '0 20px', paddingBottom: 'max(env(safe-area-inset-bottom,0px),32px)', display: 'flex', flexDirection: 'column', animation: 'loginFadeIn 0.35s ease both' }}>
            <button onClick={() => { go('signin'); setForgotSent(false) }} aria-label="Voltar" style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, fontFamily: 'var(--font-sans)', cursor: 'pointer', textAlign: 'left', marginBottom: 20, padding: 0 }}>← Voltar</button>
            <div ref={headingRef} tabIndex={-1} style={{ fontFamily: 'var(--font-brand)', fontSize: 22, fontWeight: 900, color: '#F2EFE9', letterSpacing: '0.15em', marginBottom: 12 }} role="heading" aria-level={1}>RECUPERAR</div>
            <p style={{ fontSize: 11, color: '#555', fontFamily: 'var(--font-sans)', marginBottom: 20, lineHeight: 1.6 }} aria-live="polite">
              {forgotSent ? '✓ Link enviado! Verifique seu e-mail.' : 'Informe seu e-mail para receber o link de recuperação.'}
            </p>
            {!forgotSent && (
              <>
                {errorBox}
                <label className="login-field">
                  <span className="login-field-label">E-MAIL</span>
                  <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
                </label>
                <div style={{ height: 8 }} />
                <button className="login-cta-primary" onClick={handleForgot} disabled={loading} aria-busy={loading}>
                  {loading ? 'Enviando…' : 'Enviar link'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
