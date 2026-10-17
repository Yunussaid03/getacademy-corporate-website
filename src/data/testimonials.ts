/**
 * Participant testimonials from enterprise and professional training cohorts.
 * Text is verbatim; “…” marks a trimmed sentence. Do not paraphrase participant quotes.
 */
export interface FeaturedTestimonial {
  id: string;
  name: string;
  role: string;
  programme: string;
  /** Short pull quote shown on cards. */
  highlight: string;
  /** Full testimonial, one entry per paragraph. */
  paragraphs: string[];
}

export interface ShortTestimonial {
  id: string;
  name: string;
  programme: string;
  quote: string;
}

export const featuredTestimonials: FeaturedTestimonial[] = [
  {
    id: 'amrit-muralidharan',
    name: 'Amrit Muralidharan',
    role: 'Founder of Complemen+, a scented candle business',
    programme: 'Digital Marketing programme',
    highlight:
      'Coach GK is a brilliant instructor who dissects marketing right down to the building blocks. I love his application-focused approach, which has enabled me to digest new theories better.',
    paragraphs: [
      'Coach GK is a brilliant instructor who dissects marketing right down to the building blocks. I love his application-focused approach, which has enabled me to digest new theories better. He tailors the class content to his students’ needs and gives examples that we could use for potential job applications and businesses. He has truly kept my brain juices flowing throughout class sessions through his captivating teaching style. Definitely a go-to digital marketing guru to take your marketing strategies to the next level.',
      'The program with Coach GK has been insane! I’m genuinely out of words! Every day I leave his sessions learning something new and fulfilled. I love his creative content creation approach that makes his students learn out of their comfort zone to succeed. Previously, I took part in a start-up incubator, and I must say that the learnings I’ve obtained from Coach GK’s class are far more valuable and robust compared to what I learnt in the incubator. He guides you throughout the entire process and provokes an inquisitive nature in everything that you do. Most recently, he created a very comprehensive set of slides which encompass topics ranging from keyword planning to cost per click and click-through rates. I learnt tons about what affects the quality score of a Google ad, and I’m certain that I’m on the right track to become a robust digital marketer.',
    ],
  },
  {
    id: 'chan-chia-lynn',
    name: 'Chan Chia Lynn',
    role: 'Co-founder of Tinker EduRoy (early childhood education) and Executive Director of Dignify Services',
    programme: 'Digital Marketing programme',
    highlight:
      'With bite-sized videos, summarised key points, tons of real examples and on-the-spot practice, it helped me a lot to learn about Digital Marketing.',
    paragraphs: [
      'Day 4 with Mr Ganesh. The most important thing I’ve learnt from him is to find the right person (expert) to teach the knowledge you want to learn. I’ve attended other learning platforms before to learn some knowledge, but I didn’t get as much information as I get from him. As well, Mr Ganesh’s teaching method is very interesting; every point he said is a “now I know” moment.',
      'As I learn better through practical work, I’m glad that I managed to get this opportunity to learn from him even though the class is online. With bite-sized videos, summarised key points, tons of real examples and on-the-spot practice, it helped me a lot to learn about Digital Marketing. He helped me to visualise what Digital Marketing is about and to understand my own business direction better.',
      'Thank you, Mr Ganesh.',
    ],
  },
  {
    id: 'andrew-yew-jia-haur',
    name: 'Andrew Yew Jia-Haur',
    role: 'Founder of an aspiring startup, with a digital and content marketing background',
    programme: 'Digital Marketing programme',
    highlight:
      'Now I have the tools and the mindset. If it was just the tools, I could have gotten by, but I wouldn’t have taken the business to the next step.',
    paragraphs: [
      'My first impression of the first two days of the program was that of a “boot camp”. We were going back to basics, without touching any digital marketing tools at all. Then, by Day 3, it all made sense! Everything that didn’t seem to make sense before (creating the sentiment map and the captions) found its use case. All digital marketing tools operate under the same core principles: sentiment, problems, solutions, value proposition, USPs, etc. It was just a matter of filling in the blanks. With the foundation built, the skills can be applied anywhere.',
      'The Google Ads module also made it simple for me to enter and try the platform. I initially thought that Google Ads was a complicated platform to handle, but Coach GK showed that it is actually a simple one, especially with the previous lessons providing a lot of context. Super useful and helpful for anyone looking into Digital Marketing!',
      'Come Day 5, I had a much better understanding of applying what we learned over Days 1 and 2 in practice. Now, we also added strategy into the mix: identifying areas of opportunity that we can exploit with targeted campaigns. Everything from sentiment, captions and value proposition was to prepare us for the actual marketing, to come into the battlefield fully equipped and not enter it blind. We want to put our marketing spend to good use, so it was important that all those things were covered.',
      'I initially thought the program would just be about using AI tools, but I’m glad it was so much more than that. Now I have the tools and the mindset. If it was just the tools, I could have gotten by, but I wouldn’t have taken the business to the next step.',
      'To those of you reading this review and thinking about signing up, take it from me: do it. Is it harder than other courses you’ve attended? Yes (take it from an introvert, I was challenged). Does it demand more from you? Yes. Would you feel stupid at times? Yes. Is it worth it? Absolutely.',
    ],
  },
];

/** ITIL Foundation trainees (“What Our Trainees Say”, slide 42). */
export const itilTestimonials: ShortTestimonial[] = [
  {
    id: 'shiro-homura',
    name: 'Shiro Homura',
    programme: 'ITIL Foundation',
    quote:
      'I had a really wonderful time in the ITIL Foundation class, a valuable experience with GK as my trainer. He really is a top trainer. I never found someone like him before, giving me so many inspiring stories and training me to be part of a better community. He really did such a wonderful job.',
  },
  {
    id: 'khairul-hazziq-zufar',
    name: 'Khairul Hazziq Zufar',
    programme: 'ITIL Foundation',
    quote:
      'Super awesome! The experience was worth it. Even though we had 10 straight days of training, I was always looking forward to the next day. My trainer was Mr. Ganesh, famously known as GK. BEST TRAINER EVER!',
  },
  {
    id: 'farah-amanina',
    name: 'Farah Amanina',
    programme: 'ITIL Foundation',
    quote:
      'A training centre achieves nothing without a good trainer … He’s the best trainer I ever had. The training is not just about ITIL, but the value of life we learned from him. Keep it up!',
  },
  {
    id: 'nona-bella',
    name: 'Nona Bella',
    programme: 'ITIL Foundation',
    quote:
      'It was so good and really worth it. Thank you, Sir GK, for these 10 days and for being such a great ITIL trainer, life trainer and English trainer! 24 years and I have never met a trainer as amazing as you. GK is the best trainer in the WORLD!',
  },
  {
    id: 'zuria-izati-zamzuri',
    name: 'Zuria Izati Zamzuri',
    programme: 'ITIL Foundation',
    quote:
      'These past 10 days of training were very exciting. … He is the most awesome and intelligent person I’ve ever met. He shared something valuable that made us feel like a family. Thank you, GK! Forgive, feedback and appreciate: these are the 3 important elements of life he taught us.',
  },
  {
    id: 'morgana-el-freya',
    name: 'Morgana El Freya',
    programme: 'ITIL Foundation',
    quote:
      'Thank you HRDF for funding this training … In 10 days I learned a lot about ITIL, plus soft skills such as building confidence, career path mapping and communication. I’m so lucky to have Mr. Ganesh Kumar, a.k.a. GK, as my trainer. He taught us the spirit of unity and how to be true Malaysians. There’s no one like you, GK. You’re the best trainer ever!',
  },
  {
    id: 'ramesh-mac-shanmugham',
    name: 'Ramesh Mac Shanmugham',
    programme: 'ITIL Foundation',
    quote:
      'The best training to improve our skills and knowledge. I learned how to be one family across races and religions. I had never found a trainer so energetic, passionate and knowledgeable before. My life changed a lot after attending his training. Always forgive, feedback and appreciate.',
  },
];
