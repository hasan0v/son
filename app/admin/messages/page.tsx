import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MessageActions from '@/components/admin/MessageActions'

export const metadata = {
  title: 'SON Admin | Mesajlar',
  description: 'Əlaqə mesajlarını idarə edin',
}

async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function MessagesPage() {
  const messages = await getMessages()
  const unhandledCount = messages.filter(m => !m.handled).length
  const handledCount = messages.filter(m => m.handled).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Əlaqə Mesajları</h1>
          <p className="text-gray-600">
            Cəmi {messages.length} mesaj • {unhandledCount} cavablanmayan • {handledCount} cavablanmış
          </p>
        </div>
        
        {messages.length > 0 && (
          <div className="flex gap-2">
            <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
              {unhandledCount} yeni
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {handledCount} cavablanmış
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📧</div>
              <p>Hələ mesaj yoxdur</p>
            </CardContent>
          </Card>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className={message.handled ? 'opacity-75' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <CardDescription>
                      {message.company && `${message.company} • `}
                      {new Date(message.createdAt).toLocaleDateString('az-AZ', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {message.handled ? (
                      <Badge variant="secondary">Cavablanıb</Badge>
                    ) : (
                      <Badge className="bg-orange-500">Yeni</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {message.email && (
                      <div>
                        <span className="font-medium text-gray-600">E-poçt:</span>
                        <a 
                          href={`mailto:${message.email}`}
                          className="ml-2 text-brand-primary hover:underline"
                        >
                          {message.email}
                        </a>
                      </div>
                    )}
                    {message.phone && (
                      <div>
                        <span className="font-medium text-gray-600">Telefon:</span>
                        <a 
                          href={`tel:${message.phone}`}
                          className="ml-2 text-brand-primary hover:underline"
                        >
                          {message.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-600 block mb-2">Mesaj:</span>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    {!message.handled && message.email && (
                      <a 
                        href={`mailto:${message.email}?subject=SON Təmizlik Məhsulları - Cavab&body=Hörmətli ${message.name},%0A%0A`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/90">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          E-poçt cavabı göndər
                        </Button>
                      </a>
                    )}

                    <MessageActions 
                      messageId={message.id}
                      customerName={message.name}
                      isHandled={message.handled}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}