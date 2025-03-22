"use client"
import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaRocket, FaChartLine, FaArrowRight, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';



const SheWorks: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const cards = cardsRef.current;
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
    let currentPosition = 0;
    let animationFrameId: number;

    // Clone the cards and append them to the carousel for infinite scrolling
    cards.forEach(card => {
      if (!card) return;
      const clone = card.cloneNode(true) as HTMLDivElement;
      carousel.appendChild(clone);
    });

    // Apply initial transform
    carousel.style.transform = `translateX(0)`;

    // Function to update carousel position with transform
    const updateCarouselPosition = (offset: number) => {
      carousel.style.transform = `translateX(${offset}px)`;
    };

    // Function to check if a card should be blurred based on its position
    const updateBlurEffect = () => {
      const containerRect = carousel.parentElement?.getBoundingClientRect();
      if (!containerRect) return;

      const containerLeft = containerRect.left;
      const containerWidth = containerRect.width;

      const visibleCards = carousel.querySelectorAll('.story-card') as NodeListOf<HTMLDivElement>;

      visibleCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardLeft = cardRect.left;

        // Calculate how far the card is from the left edge (percentage)
        const leftPercentage = (cardLeft - containerLeft) / containerWidth * 100;

        // Apply blur based on position (only for cards approaching left edge)
        if (leftPercentage < 10 && leftPercentage > -90) {
          // Card is approaching the left edge
          const blurAmount = Math.max(0, 5 * (1 - leftPercentage / 10));
          card.style.filter = `blur(${blurAmount}px)`;
          card.style.opacity = Math.max(0.2, leftPercentage / 10).toString();
        } else if (leftPercentage >= 10) {
          // Card is fully visible
          card.style.filter = 'blur(0)';
          card.style.opacity = '1';
        }
      });
    };

    // Automatic carousel scrolling function - right to left
    const autoScroll = () => {
      // Decrease position to move from right to left
      currentPosition -= 1;

      // Calculate total carousel width
      const totalCarouselWidth = cardWidth * cards.length;

      // Reset when we've scrolled through all original cards
      if (Math.abs(currentPosition) >= totalCarouselWidth) {
        currentPosition = 0;
      }

      updateCarouselPosition(currentPosition);
      updateBlurEffect();

      // Continue scrolling with smooth animation
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start the carousel
    autoScroll();

    // Update blur effect on resize
    const handleResize = () => {
      if (!cards[0]) return;
      const newCardWidth = cards[0].offsetWidth + 30;
      // Adjust position proportionally if card width changes
      if (newCardWidth !== cardWidth) {
        const ratio = newCardWidth / cardWidth;
        currentPosition = currentPosition * ratio;
        updateCarouselPosition(currentPosition);
      }
      updateBlurEffect();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add cards to refs
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="font-sans text-gray-800 leading-relaxed">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex">
            <FaGraduationCap className="text-2xl mt-1.5 mr-2" />
            <h1 className="text-2xl font-semibold">SheWorks</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex">
              <li className="ml-8"><a href="#" className="font-medium hover:text-pink-500 transition-colors">AI</a></li>
              <li className="ml-8"><a href="#" className="font-medium hover:text-pink-500 transition-colors">Finance</a></li>
              <li className="ml-8"><a href="#" className="font-medium hover:text-pink-500 transition-colors">Leaderboard</a></li>
              <li className="ml-8"><a href="#" className="font-medium hover:text-pink-500 transition-colors">About</a></li>
            </ul>
          </nav>
          <div className="flex items-center">
            <a href="#" className="mr-4 font-medium">Login</a>
            <a href="#" className="bg-pink-500 text-white px-5 py-2 rounded-full font-medium hover:bg-pink-600 transition-colors">Sign Up</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">Empowering Women to Thrive in Their Careers</h1>
            <p className="text-lg text-gray-600 mb-8">Join thousands of women building successful careers and businesses</p>
            <a href="#" className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors">Start Your Journey</a>
            <p className="mt-5 text-gray-600">Join 50,000+ successful women</p>
          </div>
          <div className="md:w-1/2 text-right">
            <img src="/api/placeholder/600/400" alt="Woman using laptop" className="rounded-lg shadow-lg max-w-full" />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Programs</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Leadership Development" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-5 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                  <FaRocket />
                </div>
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Leadership Development</h3>
              <p className="px-5 text-gray-600 my-4">Develop essential leadership skills for executive roles</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Entrepreneurship" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-5 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                  <FaChartLine />
                </div>
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Entrepreneurship</h3>
              <p className="px-5 text-gray-600 my-4">Launch and scale your business with expert guidance</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Tech Skills" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="relative">
                <div className="absolute -top-6 left-5 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                  <FaGraduationCap />
                </div>
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Tech Skills</h3>
              <p className="px-5 text-gray-600 my-4">Master in-demand technical skills for the future</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Success Stories</h2>
          <div className="relative overflow-hidden">
            <div ref={carouselRef} className="flex gap-8 transition-transform duration-200" style={{ transitionTimingFunction: 'linear' }}>
              {[
                {
                  name: "Sarah Johnson",
                  position: "CEO & Founder",
                  company: "Tech Innovators",
                  testimonial: "SheWorks transformed my career trajectory. The mentorship and community support were invaluable."
                },
                {
                  name: "Emily Chen",
                  position: "Senior Director",
                  company: "Global Solutions",
                  testimonial: "The leadership program gave me the confidence to take my career to the next level."
                },
                {
                  name: "Maria Rodriguez",
                  position: "Tech Lead",
                  company: "Innovation Labs",
                  testimonial: "Thanks to SheWorks, I successfully transitioned into tech and doubled my income."
                },
                {
                  name: "Jennifer Taylor",
                  position: "Marketing VP",
                  company: "Digital Brands",
                  testimonial: "The networking opportunities at SheWorks led to my dream job and meaningful connections."
                },
                {
                  name: "Priya Patel",
                  position: "Founder",
                  company: "Strategy Partners",
                  testimonial: "SheWorks gave me the tools and confidence to launch my own successful consulting business."
                },
                {
                  name: "Sophia Williams",
                  position: "Lead Developer",
                  company: "Future Tech",
                  testimonial: "The tech bootcamp completely changed my career path. I'm now leading a development team!"
                }
              ].map((story, index) => (
                <div
                  key={index}
                  ref={addToRefs}
                  className="story-card min-w-[300px] bg-white rounded-lg p-8 shadow-md relative"
                >
                  <div className="w-20 h-20 rounded-full mx-auto mb-5 overflow-hidden border-3 border-pink-500">
                    <img src={`/api/placeholder/${80 + index}/${80 + index}`} alt={story.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-3 left-5 text-6xl font-serif text-pink-100"></div>
                  <p className="text-center text-gray-600 italic mb-5">{story.testimonial}</p>
                  <h4 className="text-center font-medium mb-1">{story.name}</h4>
                  <p className="text-center text-sm text-gray-600 leading-snug">
                    {story.position}<br />{story.company}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Investors</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Namita Thapar" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Namita Thapar</h3>
              <p className="px-5 text-gray-600 my-4">Namita Thapar, Executive Director of Emcure Pharmaceuticals, is a leader in healthcare.</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Aman Gupta" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Aman Gupta</h3>
              <p className="px-5 text-gray-600 my-4">Aman Gupta, co-founder of boAt, revolutionized the audio accessories market.</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex-1">
              <div className="h-48 overflow-hidden">
                <img src="/api/placeholder/400/200" alt="Ashneer Grover" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold mt-8 px-5">Ashneer Grover</h3>
              <p className="px-5 text-gray-600 my-4">Ashneer Grover, co-founder of BharatPe, is an Indian entrepreneur known for disrupting digital payments in India.</p>
              <a href="#" className="block px-5 pb-5 text-pink-500 font-medium hover:text-pink-600 transition-colors">
                Learn More <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-around text-center">
          <div className="w-1/2 md:w-1/4 mb-8">
            <h3 className="text-3xl text-pink-500 font-bold mb-1">50K+</h3>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div className="w-1/2 md:w-1/4 mb-8">
            <h3 className="text-3xl text-pink-500 font-bold mb-1">1000+</h3>
            <p className="text-gray-600">Success Stories</p>
          </div>
          <div className="w-1/2 md:w-1/4 mb-8">
            <h3 className="text-3xl text-pink-500 font-bold mb-1">200+</h3>
            <p className="text-gray-600">Expert Mentors</p>
          </div>
          <div className="w-1/2 md:w-1/4 mb-8">
            <h3 className="text-3xl text-pink-500 font-bold mb-1">90%</h3>
            <p className="text-gray-600">Career Growth</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-500 text-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-lg mb-8">Join our community of ambitious women</p>
          <a href="#" className="inline-block bg-white text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">Get Started</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-4 mb-10">
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h3 className="text-2xl mb-5">SheWorks</h3>
              <p className="text-gray-400 mb-5">Empowering women to achieve their professional goals</p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h4 className="text-lg text-pink-500 mb-5">Quick Links</h4>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">About Us</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Programs</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Success Stories</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h4 className="text-lg text-pink-500 mb-5">Resources</h4>
              <ul>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Careers</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Events</a></li>
                <li className="mb-2"><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">Support</a></li>
              </ul>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <h4 className="text-lg text-pink-500 mb-5">Newsletter</h4>
              <p className="text-gray-400 mb-5">Stay updated with our latest news and events</p>
              <form className="flex flex-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-[200px] py-2 px-4 rounded-l-lg bg-gray-600 text-white outline-none"
                />
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded-r-lg hover:bg-pink-600 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>&copy; 2024 SheWorks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SheWorks;