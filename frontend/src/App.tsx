import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Compliance from './components/Compliance';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import AuthModal from './components/AuthModal';

type ModalKind = null | 'demo' | 'signin' | 'signup';

export default function App() {
  const [modal, setModal] = useState<ModalKind>(null);

  return (
    <>
      <Navbar
        onRequestDemo={() => setModal('demo')}
        onSignIn={() => setModal('signin')}
        onSignUp={() => setModal('signup')}
      />
      <main>
        <Hero
          onRequestDemo={() => setModal('demo')}
          onSignUp={() => setModal('signup')}
        />
        <Features />
        <Compliance />
        <Pricing onRequestDemo={() => setModal('demo')} />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />

      {modal === 'demo' && <DemoModal onClose={() => setModal(null)} />}
      {(modal === 'signin' || modal === 'signup') && (
        <AuthModal
          mode={modal}
          onClose={() => setModal(null)}
          onSwitchMode={(m) => setModal(m)}
        />
      )}
    </>
  );
}
