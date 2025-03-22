// src/app/entrepreneurs/page.tsx
"use client"
import React from 'react';

interface Business {
  name: string;
  entrepreneur: string;
  teamSize: number;
  description: string;
}

const InvestorPage: React.FC = () => {
  const businesses: Business[] = [
    {
      name: "Tech Solutions",
      entrepreneur: "Jane Doe",
      teamSize: 5,
      description: "A cutting-edge AI company focused on automation and efficiency."
    },
    {
      name: "Green Energy",
      entrepreneur: "Sarah Smith",
      teamSize: 8,
      description: "Sustainable energy solutions for a cleaner future."
    },
    {
      name: "Fashion Forward",
      entrepreneur: "Emily Johnson",
      teamSize: 4,
      description: "A trendy fashion brand emphasizing eco-friendly materials."
    },
    {
      name: "Handmade Crafts",
      entrepreneur: "Olivia Brown",
      teamSize: 3,
      description: "Beautiful handcrafted items made with love and precision."
    },
    {
      name: "Wellness Hub",
      entrepreneur: "Sophia Wilson",
      teamSize: 6,
      description: "A holistic approach to mental and physical well-being."
    },
    {
      name: "Organic Beauty",
      entrepreneur: "Ava Martinez",
      teamSize: 5,
      description: "Natural beauty products crafted from organic ingredients."
    },
    {
      name: "Healthy Bites",
      entrepreneur: "Mia Anderson",
      teamSize: 4,
      description: "Nutritious and delicious meal solutions for a healthier lifestyle."
    },
    {
      name: "Home Decor",
      entrepreneur: "Isabella Thomas",
      teamSize: 7,
      description: "Elegant and modern home decor solutions handcrafted with precision."
    },
    {
      name: "EduCare",
      entrepreneur: "Amelia White",
      teamSize: 6,
      description: "Innovative educational tools and methods for better learning."
    }
  ];

  const handleDetailsClick = () => {
    alert("More details coming soon!");
  };

  // Create rows of 3 businesses each
  const rows = [];
  for (let i = 0; i < businesses.length; i += 3) {
    rows.push(businesses.slice(i, i + 3));
  }

  return (
    <div className="container">
      <h1>Investment Opportunities</h1>
      <div className="business-list" id="businessList">
        {rows.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((business, businessIndex) => (
              <div className="business-container" key={`business-${rowIndex}-${businessIndex}`}>
                <h2 className="business-name">{business.name}</h2>
                <p className="entrepreneur">By: {business.entrepreneur}</p>
                <p className="team-size">Team Size: {business.teamSize}</p>
                <p className="description">{business.description}</p>
                <button className="details-btn" onClick={handleDetailsClick}>Details</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
        }

        .container {
          width: 80%;
          margin: 20px auto;
          text-align: center;
        }

        h1 {
          color: #fc5d9a;
          font-size: 28px;
        }

        .business-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .business-container {
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          width: 30%;
          text-align: left;
          border: 2px solid #eaeaeabd;
        }

        .row :hover {
          transform: translateY(-10px);
        }

        .business-container :hover {
          transform: scale(1);
        }

        .business-name {
          font-weight: bold;
          color: #ff277a;
        }

        .entrepreneur, .team-size, .description {
          margin: 5px 0;
          color: #666;
        }

        .details-btn {
          background-color: #ff277a;
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 5px;
          float: right;
        }

        .details-btn:hover {
          background-color: #d81b60;
        }

        @media (max-width: 768px) {
          .row {
            flex-direction: column;
            align-items: center;
          }

          .business-container {
            width: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestorPage;
