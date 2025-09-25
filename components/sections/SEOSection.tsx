'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SEOSection() {
  const keywords = [
    { term: 'Təmizlik Məhsulları', description: 'Ev və iş yerləri üçün keyfiyyətli təmizlik məhsulları' },
    { term: 'Qabyuyan Maye', description: 'Güclü və effektiv qabyuyan maye formulaları' },
    { term: 'Ağardıcı', description: 'Duru və toz ağardıcı məhsulları' },
    { term: 'Maye Sabun', description: 'Əl və vücud üçün təbii maye sabun' },
    { term: 'Xlor', description: 'Dezinfeksiya və təmizlik üçün xlor məhsulları' },
    { term: 'Təmizlik Vasitələri', description: 'Professional və ev təmizlik vasitələri' }
  ]

  const features = [
    {
      title: 'Keyfiyyətli Məhsullar',
      description: 'Azərbaycanda istehsal olunan yüksək keyfiyyətli təmizlik məhsulları',
      keywords: 'keyfiyyətli təmizlik məhsulları, azərbaycan istehsalı'
    },
    {
      title: 'Topdan Satış',
      description: 'Bütün təmizlik məhsulları üçün əlverişli topdan qiymətlər',
      keywords: 'topdan təmizlik məhsulları, ucuz qiymət'
    },
    {
      title: 'Gəncə Çatdırılma',
      description: 'Gəncə şəhəri və ətraf rayonlara sürətli çatdırılma xidməti',
      keywords: 'gəncə təmizlik məhsulları, çatdırılma xidməti'
    },
    {
      title: 'Professional Təmizlik',
      description: 'Hotellər, restoranlar və iş yerləri üçün professional həllər',
      keywords: 'professional təmizlik məhsulları, hotel təmizlik'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Main SEO Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          >
            Gəncədə Ən Keyfiyyətli <span className="text-blue-600">Təmizlik Məhsulları</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 leading-relaxed mb-8"
          >
            <strong>SON Təmizlik Məhsulları</strong> olaraq Gəncə şəhərində və Azərbaycanın hər yerində 
            keyfiyyətli təmizlik vasitələri təqdim edirik. Bizim məhsul çeşidimiz qabyuyan maye, 
            ağardıcı, maye sabun, xlor və digər təmizlik kimyəvi məhsullarını əhatə edir. 
            Ev təmizliyi və professional istifadə üçün ucuz qiymətlərlə topdan satış həyata keçiririk.
          </motion.p>
        </div>

        {/* Keywords Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {keywords.map((keyword, index) => (
            <motion.div
              key={keyword.term}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-3">{keyword.term}</h3>
              <p className="text-gray-600">{keyword.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              <div className="text-sm text-blue-600 font-medium">
                🏷️ {feature.keywords}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location-based SEO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-blue-50 p-8 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Gəncə şəhərində təmizlik məhsulları tədarükü
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
            Zülfü Hacıyev 56 ünvanında yerləşən mağazamızdan bütün növ təmizlik məhsullarını 
            əldə edə bilərsiniz. Qabyuyan maye, ağardıcı, maye sabun, xlor və digər təmizlik 
            vasitələri üçün keyfiyyətli və sərfəli həllər təklif edirik. Gəncə, Goranboy, 
            Samux və ətraf rayonlara çatdırılma xidməti mövcuddur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Məhsulları Gör
            </Link>
            <Link 
              href="/#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Əlaqə Saxla
            </Link>
          </div>
        </motion.div>

        {/* Additional SEO Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              Niyə SON Təmizlik Məhsullarını seçməlisiniz?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <strong className="text-blue-600">15+ illik təcrübə</strong> - Təmizlik məhsulları sahəsində uzun illərdir fəaliyyət göstəririk
              </div>
              <div>
                <strong className="text-blue-600">Keyfiyyət zəmanəti</strong> - Bütün məhsullar keyfiyyət standartlarına uyğundur  
              </div>
              <div>
                <strong className="text-blue-600">Əlverişli qiymətlər</strong> - Topdan satış qiymətləri ilə maksimum qənaət
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}