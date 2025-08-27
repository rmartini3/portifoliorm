import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Mail, Phone, Linkedin } from 'lucide-react';

function ContactPage({ t }) {
  return (
    <div className="min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">{t.contactTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t.contactInfoTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-4">
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>{t.phone}: (11) 97112-8258</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>{t.email}: rmartini3corp@outlook.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <a href={t.footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {t.linkedin}: linkedin.com/in/rafael-martiniano-11b40493
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t.sendMessageTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">{t.nameLabel}</label>
                  <Input id="name" placeholder={t.nameLabel} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">{t.emailLabel}</label>
                  <Input id="email" type="email" placeholder={t.emailLabel} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject">{t.subjectLabel}</label>
                  <Input id="subject" placeholder={t.subjectLabel} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">{t.messageLabel}</label>
                  <Textarea id="message" placeholder={t.messageLabel} />
                </div>
                <a href={`mailto:rmartini3corp@outlook.com?subject=${encodeURIComponent(t.subjectLabel)}&body=${encodeURIComponent(t.messageLabel)}`} className="inline-block w-full">
                  <Button asChild className="w-full">
                    <span>{t.sendMessageButton}</span>
                  </Button>
                </a>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
