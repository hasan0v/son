'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Gəncədə ən keyfiyyətli təmizlik məhsulları haradan ala bilərəm?",
      answer: "SON Təmizlik Məhsulları olaraq Gəncə şəhərində Zülfü Hacıyev 56 ünvanında yerləşirik. Burada qabyuyan maye, ağardıcı, maye sabun, xlor və bütün növ təmizlik vasitələrini keyfiyyətli və ucuz qiymətlərlə tapa bilərsiniz.",
      keywords: "gəncə təmizlik məhsulları, keyfiyyətli təmizlik vasitələri"
    },
    {
      question: "Qabyuyan maye qiyməti nə qədərdir və topdan satış var mı?",
      answer: "Bizim qabyuyan maye məhsullarımız müxtəlif həcmlərdə və əlverişli qiymətlərlə təklif olunur. Topdan satış üçün xüsusi endirimlər tətbiq edirik. Dəqiq qiymətlər üçün bizimlə əlaqə saxlayın.",
      keywords: "qabyuyan maye qiyməti, topdan qabyuyan maye"
    },
    {
      question: "Ağardıcı məhsulları hansı növlərdə mövcuddur?",
      answer: "Bizim məhsul çeşidimizda duru ağardıcı və toz ağardıcı mövcuddur. Hər iki növ yüksək keyfiyyətli və effektiv təmizlik təmin edir. Professional və ev istifadəsi üçün müxtəlif həcmlərdə təklif edirik.",
      keywords: "duru ağardıcı, toz ağardıcı, ağardıcı növləri"
    },
    {
      question: "Maye sabun və digər təmizlik vasitələri təhlükəsiz mi?",
      answer: "Bütün məhsullarımız keyfiyyət standartlarına uyğun istehsal olunur və təhlükəsizlik sertifikatlarına malikdir. Maye sabun məhsullarımız dəriyə qarşı yumşaq tərkibə malikdir və ailə üzvləri üçün təhlükəsizdir.",
      keywords: "təhlükəsiz maye sabun, keyfiyyət standartları"
    },
    {
      question: "Çatdırılma xidməti var mı və hansı ərazilərə çatdırılır?",
      answer: "Bəli, Gəncə şəhəri və ətraf rayonlara çatdırılma xidməti təklif edirik. Goranboy, Samux və digər yaxın rayonlara da çatdırılma həyata keçiririk. Çatdırılma haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın.",
      keywords: "gəncə çatdırılma, təmizlik məhsulları çatdırılma"
    },
    {
      question: "Professional təmizlik üçün hansı məhsullar tövsiyə edirsiniz?",
      answer: "Hotellər, restoranlar və digər ticarət obyektləri üçün güclü qabyuyan maye, xlor məhsulları və professional ağardıcılar tövsiyə edirik. Bu məhsullar yüksək effektivlik və uzunmüddətli nəticə təmin edir.",
      keywords: "professional təmizlik məhsulları, hotel təmizlik"
    },
    {
      question: "Xlor məhsulları dezinfeksiya üçün necə istifadə edilir?",
      answer: "Xlor məhsullarımız güclü dezinfeksiya təsiri göstərir. Su ilə seyreltdikdən sonra səthlərin təmizlənməsində istifadə edilir. İstifadə qaydaları barədə ətraflı məlumatı məhsul üzərindəki etiketdən öyrənə bilərsiniz.",
      keywords: "xlor dezinfeksiya, xlor istifadəsi"
    },
    {
      question: "Ev təmizliyi üçün ən yaxşı məhsul dəsti hansıdır?",
      answer: "Ev təmizliyi üçün qabyuyan maye, maye sabun, duru ağardıcı və universal təmizlik məhsullarından ibarət dəstimizi tövsiyə edirik. Bu dəst bütün ev ehtiyaclarını qarşılayır və əlverişli qiymətə təklif olunur.",
      keywords: "ev təmizlik məhsulları, təmizlik dəsti"
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Təmizlik Məhsulları haqqında <span className="text-blue-600">Tez-tez verilən suallar</span>
            </h2>
            <p className="text-lg text-gray-600">
              Gəncədə təmizlik məhsulları, qabyuyan maye, ağardıcı və digər məsələlər barədə ən çox verilən suallar
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700 leading-relaxed mb-3">
                          {faq.answer}
                        </p>
                        <div className="text-sm text-blue-600 font-medium">
                          🏷️ Açar sözlər: {faq.keywords}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-6">
              Başqa sualınız var? Bizimlə əlaqə saxlayın və mütəxəssislərimiz sizə kömək etsin.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Sual ver
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.436L3 21l1.436-5.094A8.959 8.959 0 713 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}