// ═════════════════════════════════════════════════════════════════════════════
// BOÎTE À OUTILS CRUD — point d'entrée unique
//
// Tout est importable depuis '@/crud'. Deux façons de s'en servir :
//
// 1) Fonctions génériques (n'importe quel endpoint) :
//      import { listerActifs, modifierUnChamp, purger } from '@/crud'
//
// 2) Espaces de noms par domaine (le plus lisible) :
//      import { Tickets, Parc, References, Utilisateurs } from '@/crud'
//      await Tickets.changerStatut(12, 6)          // clore le ticket 12
//      await Parc.changerLieu('computer', 5, 3)    // déplacer l'ordi 5 au lieu 3
//      const lieux = await References.listerReferences('lieu')
//      await Utilisateurs.changerActivation(8, false)
// ═════════════════════════════════════════════════════════════════════════════

// Génériques (à plat)
export * from './crudGenerique'

// Domaines (espaces de noms)
export * as Tickets from './crudTickets'
export * as Parc from './crudParc'
export * as References from './crudReferences'
export * as Utilisateurs from './crudUtilisateurs'
