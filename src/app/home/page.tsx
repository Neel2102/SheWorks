import React, { useEffect, useRef } from 'react';

const SheWorks: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const cardWidthRef = useRef<number>(0);
  const currentPositionRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = document.querySelectorAll('.story-card');
    cardsRef.current = cards;

    if (cards.length > 0) {
      cardWidthRef.current = cards[0].offsetWidth + 30; // Card width + gap

      // Clone the cards and append them to the carousel for infinite scrolling
      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        carousel?.appendChild(clone);
      });

      // Start the carousel
      autoScroll();
    }

    // Cleanup function to stop the animation
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const updateCarouselPosition = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  const updateBlurEffect = () => {
    const visibleCards = document.querySelectorAll('.story-card');
    const containerRect = document.querySelector('.story-carousel-container')?.getBoundingClientRect();
    if (!containerRect) return;

    const containerLeft = containerRect.left;
    const containerRight = containerRect.right;

    visibleCards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardLeft = cardRect.left;
      const cardRight = cardRect.right;

      // Calculate how far the card is from the left edge (percentage)
      const leftPercentage = ((cardLeft - containerLeft) / containerRect.width) * 100;

      // Apply blur based on position (only for cards approaching left edge)
      if (leftPercentage < 10 && leftPercentage > -90) {
        const blurAmount = Math.max(0, 5 * (1 - leftPercentage / 10));
        (card as HTMLElement).style.filter = `blur(${blurAmount}px)`;
        (card as HTMLElement).style.opacity = `${Math.max(0.2, leftPercentage / 10)}`;
      } else if (leftPercentage >= 10) {
        // Card is fully visible
        (card as HTMLElement).style.filter = 'blur(0)';
        (card as HTMLElement).style.opacity = '1';
      }
    });
  };

  const autoScroll = () => {
    // Decrease position to move from right to left
    currentPositionRef.current -= 1;

    // Calculate total carousel width
    const totalCarouselWidth = cardWidthRef.current * (cardsRef.current?.length || 0);

    // Reset when we've scrolled through all original cards
    if (Math.abs(currentPositionRef.current) >= totalCarouselWidth) {
      currentPositionRef.current = 0;
    }

    updateCarouselPosition(currentPositionRef.current);
    updateBlurEffect();

    // Continue scrolling with smooth animation
    animationFrameIdRef.current = requestAnimationFrame(autoScroll);
  };

  return (
    <div style={styles.body}>
      {/* Navigation */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logo}>
            <i className="fas fa-graduation-cap" style={styles.logoIcon}></i>
            <h1 style={styles.logoText}>SheWorks</h1>
          </div>
          <nav>
            <ul style={styles.navList}>
              <li><a href="#" style={styles.navLink}>AI</a></li>
              <li><a href="#" style={styles.navLink}>Finance</a></li>
              <li><a href="#" style={styles.navLink}>Community</a></li>
              <li><a href="#" style={styles.navLink}>About</a></li>
            </ul>
          </nav>
          <div style={styles.authButtons}>
            <a href="#" style={styles.loginBtn}>Login</a>
            <a href="#" style={styles.signupBtn}>Sign Up</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Empowering Women to Thrive in Their Careers</h1>
            <p style={styles.heroText}>Join thousands of women building successful careers and businesses</p>
            <a href="#" style={styles.ctaBtn}>Start Your Journey</a>
            <p style={styles.joinText}>Join 50,000+ successful women</p>
          </div>
          <div style={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Woman using laptop"
              style={styles.heroImg}
            />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section style={styles.programs}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Programs</h2>
          <div style={styles.programCards}>
            <div style={styles.programCard}>
              <div style={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Leadership Development"
                  style={styles.cardImg}
                />
              </div>
              <div style={styles.cardIcon}>
                <i className="fas fa-rocket" style={styles.icon}></i>
              </div>
              <h3 style={styles.cardTitle}>Leadership Development</h3>
              <p style={styles.cardText}>Develop essential leadership skills for executive roles</p>
              <a href="#" style={styles.learnMore}>Learn More <i className="fas fa-arrow-right" style={styles.arrowIcon}></i></a>
            </div>
            <div style={styles.programCard}>
              <div style={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Entrepreneurship"
                  style={styles.cardImg}
                />
              </div>
              <div style={styles.cardIcon}>
                <i className="fas fa-chart-line" style={styles.icon}></i>
              </div>
              <h3 style={styles.cardTitle}>Entrepreneurship</h3>
              <p style={styles.cardText}>Launch and scale your business with expert guidance</p>
              <a href="#" style={styles.learnMore}>Learn More <i className="fas fa-arrow-right" style={styles.arrowIcon}></i></a>
            </div>
            <div style={styles.programCard}>
              <div style={styles.cardImage}>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Tech Skills"
                  style={styles.cardImg}
                />
              </div>
              <div style={styles.cardIcon}>
                <i className="fas fa-graduation-cap" style={styles.icon}></i>
              </div>
              <h3 style={styles.cardTitle}>Tech Skills</h3>
              <p style={styles.cardText}>Master in-demand technical skills for the future</p>
              <a href="#" style={styles.learnMore}>Learn More <i className="fas fa-arrow-right" style={styles.arrowIcon}></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section style={styles.successStories}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Success Stories</h2>
          <div style={styles.storyCarouselContainer}>
            <div style={styles.storyCarousel} ref={carouselRef}>
              <div style={styles.storyCard}>
                <div style={styles.profileImage}>
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sarah Johnson"
                    style={styles.profileImg}
                  />
                </div>
                <div style={styles.quote}>"</div>
                <p style={styles.testimonial}>SheWorks transformed my career trajectory. The mentorship and community support were invaluable.</p>
                <h4 style={styles.storyName}>Sarah Johnson</h4>
                <p style={styles.position}>CEO & Founder<br />Tech Innovators</p>
              </div>
              {/* Repeat for other story cards */}
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section style={styles.investers}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Investors</h2>
          <div style={styles.investersCards}>
            <div style={styles.investersCard}>
              <div style={styles.investersCardImage}>
                <img
                  src="https://images.yourstory.com/cs/wordpress/2017/02/My-photo.jpg?mode=crop&crop=faces&ar=2%3A1&format=auto&w=1920&q=75"
                  alt="Namita Thapar"
                  style={styles.investersCardImg}
                />
              </div>
              <h3 style={styles.investersCardTitle}>Namita Thapar</h3>
              <p style={styles.investersCardText}>Namita Thapar, Executive Director of Emcure Pharmaceuticals, is a leader in healthcare.</p>
              <a href="#" style={styles.investersLearnMore}>Learn More <i className="fas fa-arrow-right" style={styles.arrowIcon}></i></a>
            </div>
            {/* Repeat for other investor cards */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.stats}>
        <div style={styles.container}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>50K+</h3>
            <p style={styles.statText}>Active Members</p>
          </div>
          {/* Repeat for other stats */}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Career?</h2>
          <p style={styles.ctaText}>Join our community of ambitious women</p>
          <a href="#" style={styles.ctaBtn}>Get Started</a>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerColumns}>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>SheWorks</h3>
              <p style={styles.footerText}>Empowering women to achieve their professional goals</p>
              <div style={styles.socialLinks}>
                <a href="#" style={styles.socialLink}><i className="fab fa-linkedin"></i></a>
                <a href="#" style={styles.socialLink}><i className="fab fa-twitter"></i></a>
                <a href="#" style={styles.socialLink}><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            {/* Repeat for other footer columns */}
          </div>
          <div style={styles.copyright}>
            <p>&copy; 2024 SheWorks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Inline CSS styles
const styles = {
  body: {
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.6,
    color: '#333',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: '24px',
    marginTop: '6px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: 0,
  },
  navList: {
    display: 'flex',
  },
  navLink: {
    fontWeight: 500,
    marginLeft: '30px',
    transition: 'color 0.3s',
  },
  authButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  loginBtn: {
    marginRight: '15px',
    fontWeight: 500,
  },
  signupBtn: {
    backgroundColor: '#ff4f93',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '25px',
    fontWeight: 500,
    transition: 'background-color 0.3s',
  },
  hero: {
    backgroundColor: '#f8f9fa',
    padding: '60px 0',
  },
  heroContent: {
    flex: 1,
    paddingRight: '40px',
  },
  heroTitle: {
    fontSize: '42px',
    lineHeight: 1.2,
    marginBottom: '20px',
    color: '#333',
  },
  heroText: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#666',
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: '#ff4f93',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '30px',
    fontWeight: 500,
    transition: 'background-color 0.3s',
  },
  joinText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#666',
  },
  heroImage: {
    flex: 1,
    textAlign: 'right',
  },

    icon: {
      fontSize: '24px', // Adjust the size as needed
      color: '#ff4f93', // Icon color (matches your theme)
      marginRight: '10px', // Spacing between icon and text (if any)
      transition: 'color 0.3s', // Smooth color transition on hover
    },


  heroImg: {
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  programs: {
    backgroundColor: '#fff',
    padding: '80px 0',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px',
  },
  programCards: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
  },
  programCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
  },
  cardImage: {
    height: '200px',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s',
  },
  cardIcon: {
    position: 'absolute',
    top: '180px',
    left: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#ff4f93',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
  },
  cardTitle: {
    marginTop: '30px',
    padding: '0 20px',
    fontSize: '22px',
  },
  cardText: {
    padding: '0 20px',
    color: '#666',
    marginBottom: '20px',
  },
  learnMore: {
    display: 'block',
    padding: '0 20px 20px',
    color: '#ff4f93',
    fontWeight: 500,
    transition: 'color 0.3s',
  },
  arrowIcon: {
    marginLeft: '5px',
    transition: 'transform 0.3s',
  },
  successStories: {
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  storyCarouselContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  storyCarousel: {
    display: 'flex',
    gap: '30px',
    transition: 'transform 0.02s linear',
  },
  storyCard: {
    minWidth: '300px',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    transition: 'filter 0.5s, opacity 0.5s',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    margin: '0 auto 20px',
    overflow: 'hidden',
    border: '3px solid #ff4f93',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  quote: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    fontSize: '60px',
    color: 'rgba(255, 79, 147, 0.1)',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
  },
  testimonial: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#555',
    fontStyle: 'italic',
  },
  storyName: {
    textAlign: 'center',
    marginBottom: '5px',
    color: '#333',
  },
  position: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.4,
  },
  investers: {
    backgroundColor: '#fff',
  },
  investersCards: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
  },
  investersCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
  },
  investersCardImage: {
    height: '200px',
    overflow: 'hidden',
  },
  investersCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s',
  },
  investersCardTitle: {
    marginTop: '30px',
    padding: '0 20px',
    fontSize: '22px',
  },
  investersCardText: {
    padding: '0 20px',
    color: '#666',
    marginBottom: '20px',
  },
  investersLearnMore: {
    display: 'block',
    padding: '0 20px 20px',
    color: '#ff4f93',
    fontWeight: 500,
    transition: 'color 0.3s',
  },
  stats: {
    backgroundColor: '#fff',
    padding: '60px 0',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '36px',
    color: '#ff4f93',
    marginBottom: '5px',
  },
  statText: {
    color: '#666',
    fontSize: '16px',
  },
  cta: {
    backgroundColor: '#ff4f93',
    color: 'white',
    textAlign: 'center',
  },
  ctaTitle: {
    color: 'white',
  },
  ctaText: {
    marginBottom: '30px',
    fontSize: '18px',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '60px 0 30px',
  },
  footerColumns: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '40px',
  },
  footerColumn: {
    flex: 1,
    minWidth: '200px',
    marginBottom: '30px',
  },
  footerTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  footerText: {
    color: '#ccc',
    marginBottom: '20px',
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
  },
  socialLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transition: 'background-color 0.3s',
  },
  newsletterForm: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  newsletterInput: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '10px 0 0 10px',
    outline: 'none',
    backgroundColor: '#808080',
    color: '#fdfdfd',
  },
  subscribeBtn: {
    backgroundColor: '#ff4f93',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '0 10px 10px 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  copyright: {
    textAlign: 'center',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ccc',
    fontSize: '14px',
  },
};

export default SheWorks;