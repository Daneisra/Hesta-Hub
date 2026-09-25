import './App.css'

type Application = {
  id: string
 category: string
  name: string
  description: string
  features: readonly string[]
  href: string
  action: string
  monogram: string
  accent: 'azure' | 'violet'
}

// Add another entry here to give a future Hesta application its own card.
const applications: readonly Application[] = [
  {
    id: 'carte-hesta',
   category: 'Explorer le monde',
    name: 'Carte Hesta',
    description:
      'Parcourez un monde vivant, suivez ses quêtes et retrouvez les histoires qui relient les joueurs.',
    features: ['Carte interactive', 'Quêtes & communauté', 'Chronologie & planning'],
    href: 'https://cartehesta.dannytech.fr/',
    action: 'Explorer Carte Hesta',
    monogram: 'CH',
    accent: 'azure',
  },
  {
    id: 'systeme-pa',
   category: 'Préparer l’aventure',
    name: 'Système PA',
    description:
      'Composez vos armures, comparez les matériaux et préparez votre équipement pour le combat.',
    features: ['Calcul d’armures', 'Matériaux & catalogue', 'Outils de combat'],
    href: 'https://pahesta.dannytech.fr/',
    action: 'Ouvrir Système PA',
    monogram: 'PA',
    accent: 'violet',
  },
]

function ApplicationCard({ application, index }: { application: Application; index: number }) {
  return (
    <article className={`application-card application-card--${application.accent}`}>
      <div className="application-card__art" aria-hidden="true">
        <span className="application-card__orbit" />
        <span className="application-card__monogram">{application.monogram}</span>
      </div>

      <div className="application-card__content">
        <div className="application-card__topline">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="application-card__topline-rule" />
          <span>{application.category}</span>
        </div>

        <h3>{application.name}</h3>
        <p className="application-card__description">{application.description}</p>

        <ul className="application-card__features" aria-label={`Fonctions de ${application.name}`}>
          {application.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <a className="application-card__action" href={application.href}>
          {application.action}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <div className="site-shell">
        <header className="site-header">
          <a className="site-header__brand" href="#accueil" aria-label="Hesta, accueil">
            <span className="site-header__symbol" aria-hidden="true">✦</span>
            <span>HESTA</span>
          </a>

          <nav className="site-header__nav" aria-label="Navigation principale">
            <a href="#applications">Les applications</a>
            <a href="#communaute">Communauté</a>
          </nav>
        </header>

        <main id="contenu">
          <section className="hero" id="accueil" aria-labelledby="hero-title">
            <div className="hero__stars" aria-hidden="true" />
            <div className="hero__halo" aria-hidden="true">
              <span />
            </div>

            <div className="hero__content">
              <p className="hero__eyebrow">
                <span aria-hidden="true">✦</span> Une porte vers un monde vivant
              </p>
              <h1 id="hero-title">HESTA</h1>
              <div className="hero__divider" aria-hidden="true"><span /></div>
              <p className="hero__intro">
                Un univers de jeu de rôle façonné par les aventures de ses joueurs.
              </p>
              <p className="hero__subtext">
                Explorez ses lieux et ses récits. Préparez la suite de votre voyage.
              </p>
              <a className="hero__link" href="#applications">
                Découvrir les applications <span aria-hidden="true">↓</span>
              </a>
            </div>

            <p className="hero__footnote">Le monde continue de s’écrire.</p>
          </section>

          <section className="applications" id="applications" aria-labelledby="applications-title">
            <div className="section-heading">
              <div>
                <p className="section-heading__eyebrow">Les portes d’entrée</p>
                <h2 id="applications-title">Choisissez votre chemin.</h2>
              </div>
              <p>
                Un même univers, plusieurs façons de l’explorer et de préparer vos aventures.
              </p>
            </div>

            <div className="applications__grid">
              {applications.map((application, index) => (
                <ApplicationCard key={application.id} application={application} index={index} />
              ))}
            </div>
          </section>

          <section className="community" id="communaute" aria-labelledby="community-title">
            <div className="community__symbol" aria-hidden="true">✧</div>
            <div className="community__copy">
              <p className="community__eyebrow">La communauté</p>
              <h2 id="community-title">L’aventure se vit aussi ensemble.</h2>
              <p>
                Retrouvez les joueurs, les annonces et l’accès au Discord depuis la communauté Carte Hesta.
              </p>
            </div>
            <a className="community__link" href="https://cartehesta.dannytech.fr/#home-community">
              Voir la communauté <span aria-hidden="true">↗</span>
            </a>
          </section>
        </main>

        <footer className="site-footer">
          <span>HESTA</span>
          <p>Un monde à explorer. Des histoires à écrire.</p>
          <a href="#accueil">Retour en haut ↑</a>
        </footer>
      </div>
    </>
  )
}

export default App