import { Link } from 'react-router-dom';
import { Gamepad2, MessageCircle, Mail, MapPin, Clock, Shield, Zap, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre nosotros', href: '/about' },
  { name: 'Juegos', href: '/games' },
  { name: 'Referencias', href: '/reviews' },
];

const gameLinks = [
  { name: 'Free Fire', href: '/games/free-fire' },
  { name: 'PUBG Mobile', href: '/games/pubg-mobile' },
  { name: 'Genshin Impact', href: '/games/genshin-impact' },
  { name: 'Honor of Kings', href: '/games/honor-of-kings' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Trust Badges Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Entrega Rápida</h4>
                <p className="text-sm text-muted-foreground">5-15 minutos promedio</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">100% Seguro</h4>
                <p className="text-sm text-muted-foreground">Transacciones protegidas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Soporte Humano</h4>
                <p className="text-sm text-muted-foreground">Atención personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="font-gaming font-bold text-xl text-foreground">
                Parzival<span className="text-primary">FF</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu tienda de confianza para recargas gaming. Diamantes, UC, Genesis Crystals y más al mejor precio.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Lun - Dom: 9:00 - 23:00</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-gaming font-semibold text-foreground">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Games */}
          <div className="space-y-4">
            <h4 className="font-gaming font-semibold text-foreground">Juegos Populares</h4>
            <ul className="space-y-2">
              {gameLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-gaming font-semibold text-foreground">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@parzivalff.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contacto@parzivalff.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Latinoamérica
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} ParzivalFF Recargas. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
