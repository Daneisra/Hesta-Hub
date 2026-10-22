import { useEffect, useState } from 'react'
import './Community.css'

const discord = {
  href: 'https://discord.gg/sCFWb87SBY',
  guildId: '1193915594567843921',
  inviteApi: 'https://discord.com/api/v10/invites/sCFWb87SBY?with_counts=true',
}

const channels = [
  {
    name: 'Discord',
    title: 'Serveur principal',
    description: 'Organisation des sessions, annonces JDR et coordination des groupes.',
    href: discord.href,
    action: 'Rejoindre Discord',
  },
  {
    name: 'YouTube',
    title: 'Lore & récaps',
    description: 'Récaps, vidéos d’univers et ambiances pour prolonger les campagnes.',
    href: 'https://www.youtube.com/@Daneisra',
    action: 'Regarder les vidéos',
  },
  {
    name: 'Reddit',
    title: 'Discussions',
    description: 'Partage d’idées, retours et archives communautaires.',
    href: 'https://www.reddit.com/',
    action: 'Explorer Reddit',
  },
]

const repositories = [
  { name: 'Carte Hesta', description: 'Carte interactive, chronologie et planning.', href: 'https://github.com/Daneisra/Carte-Hesta' },
  { name: 'Système PA', description: 'Armures, matériaux et outils de combat.', href: 'https://github.com/Daneisra/Armures-d100-Hesta' },
  { name: 'Hesta Codex', description: 'Encyclopédie, relations et provenance.', href: 'https://github.com/Daneisra/Hesta-Codex' },
  { name: 'Hesta Hub', description: 'Portail et support général de l’écosystème.', href: 'https://github.com/Daneisra/Hesta-Hub' },
]

const wishlists = [
  { name: 'Maps Maps Never Enough Maps !', href: 'https://app.roll20.net/wishlist/195278' },
  { name: 'Give It To Me !', href: 'https://app.roll20.net/wishlist/255153' },
  { name: '40k Addiction', href: 'https://app.roll20.net/wishlist/255154' },
  { name: 'Boarding, Matey!', href: 'https://app.roll20.net/wishlist/255155' },
  { name: 'Token’s Love', href: 'https://app.roll20.net/wishlist/255156' },
]

function DiscordMemberCount() {
  const [count, setCount] = useState<number | null | 'unavailable'>(null)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    const timeout = window.setTimeout(() => controller.abort(), 8000)

    async function loadMembers() {
      try {
        const response = await fetch(discord.inviteApi, { signal: controller.signal })
        if (!response.ok) throw new Error('Discord unavailable')
        const data: { approximate_member_count?: number } = await response.json()
        const members = data.approximate_member_count
        if (typeof members !== 'number' || !Number.isSafeInteger(members) || members < 0) {
          throw new Error('Invalid Discord count')
        }
        if (active) setCount(members)
      } catch {
        if (active) setCount('unavailable')
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void loadMembers()
    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [])

  return (
    <span className="channel-card__presence" role="status">
      {typeof count === 'number'
        ? `Environ ${new Intl.NumberFormat('fr-FR').format(count)} membres sur Discord`
        : count === 'unavailable'
          ? 'Compteur indisponible · le serveur reste accessible'
          : 'Vérification du nombre de membres…'}
    </span>
  )
}

export function Community() {
  return (
    <>
      <section className="community-section" id="communaute" aria-labelledby="community-title">
        <div className="section-heading">
          <div>
            <p className="section-heading__eyebrow">Rester connecté</p>
            <h2 id="community-title">L’aventure se vit aussi ensemble.</h2>
          </div>
          <p>Retrouvez les joueurs, les récits et les échanges du Monde d’Hesta.</p>
        </div>

        <div className="community-channels">
          {channels.map(channel => (
            <a className="channel-card" href={channel.href} key={channel.name}>
              <span className="community-badge">{channel.name}</span>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              {channel.name === 'Discord' && <DiscordMemberCount />}
              <span className="community-card-action">{channel.action} <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>

        <div className="discord-panel">
          <div className="discord-panel__copy">
            <p className="section-heading__eyebrow">Widget Discord</p>
            <h3>Le serveur en direct.</h3>
            <p>Lore, sessions, annonces et coordination des groupes JDR. Retrouvez la communauté entre deux aventures.</p>
            <a className="community-button" href={discord.href}>Ouvrir Discord <span aria-hidden="true">↗</span></a>
            <p className="discord-panel__fallback">Si le widget ne s’affiche pas, le lien Discord reste disponible.</p>
          </div>
          <iframe
            className="discord-widget"
            title="Serveur Discord du Monde d’Hesta"
            src={`https://discord.com/widget?id=${discord.guildId}&theme=dark`}
            loading="lazy"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>
      </section>

      <section className="repositories-section" id="projets" aria-labelledby="repositories-title">
        <div className="section-heading">
          <div>
            <p className="section-heading__eyebrow">Les projets sources</p>
            <h2 id="repositories-title">Hesta, à livre ouvert.</h2>
          </div>
          <p>Consultez le code, suivez les évolutions et signalez les bugs dans le dépôt de chaque application.</p>
        </div>
        <div className="repositories-grid">
          {repositories.map(repository => (
            <a className="repository-card" href={repository.href} key={repository.name}>
              <span className="community-badge">GitHub</span>
              <h3>{repository.name}</h3>
              <p>{repository.description}</p>
              <span className="community-card-action">Consulter le dépôt <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
        <p className="repositories-note">
          Une question sur l’ensemble de l’écosystème ? Retrouvez le <a href="https://github.com/Daneisra/Hesta-Hub/issues">support général du portail</a>.
        </p>
      </section>

      <section className="support-section" id="soutenir" aria-labelledby="support-title">
        <div className="support-panel">
          <div>
            <p className="section-heading__eyebrow">Soutenir</p>
            <h2 id="support-title">Soutenir le projet.</h2>
            <p className="support-intro">Soutenez Hesta via PayPal ou Ko-fi, et retrouvez les wishlists Roll20 utiles pour faire vivre la table.</p>
          </div>
          <div className="support-donations">
            <a className="community-button community-button--primary" href="https://paypal.me/Daneisra?country.x=FR&locale.x=fr_FR">
              Soutenir via PayPal <span aria-hidden="true">↗</span>
            </a>
            <a className="community-button" href="https://ko-fi.com/daneisra">
              Soutenir via Ko-fi <span aria-hidden="true">↗</span>
            </a>
          </div>
          <h3>Wishlists Roll20</h3>
          <ul className="support-wishlists">
            {wishlists.map(wishlist => (
              <li key={wishlist.href}><a href={wishlist.href}>{wishlist.name} <span aria-hidden="true">↗</span></a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
