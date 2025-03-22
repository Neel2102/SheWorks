import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const blogs = [
  {
    section: "Budgeting",
    items: [
      {
        id: 1,
        title: "Smart Budgeting Tips",
        excerpt: "Learn how to manage your expenses wisely and save more each month.",
        content: "Budgeting is the foundation of financial success. Start by tracking your income and expenses, categorize your spending, and set a savings goal.\n\n1. Track Your Expenses: Use apps or spreadsheets to monitor where your money goes.\n2. **Set a Monthly Budget: Allocate funds for essentials, leisure, and savings.\n3. **Eliminate Unnecessary Expenses: Cut back on subscriptions or dining out too often.\n4. **Use Cash Envelopes: Physically divide your money for different categories.\n5. **Automate Savings: Set up an auto-transfer to your savings account every month."
      },
      {
        id: 2,
        title: "50/30/20 Rule",
        excerpt: "A simple and effective way to manage your finances.",
        content: "The 50/30/20 rule is a budgeting method where: \n\n- 50% of income goes to necessities (rent, utilities, food).\n- 30% is spent on wants (entertainment, dining out, travel).\n- 20% is saved or used to pay off debt.\n\n*Why It Works:\n- Ensures a balanced financial lifestyle.\n- Keeps you on track with savings.\n- Helps avoid overspending.\n\nTips to Implement It*:\n- Use a budgeting app to allocate your salary accordingly.\n- Adjust the percentages if necessary but ensure savings aren't compromised."
      }
    ]
  },
  {
    section: "Investing",
    items: [
      {
        id: 3,
        title: "Investment Strategies for Women",
        excerpt: "Discover the best investment options to grow your wealth.",
        content: "Investing is crucial for long-term financial stability.\n\n*Types of Investments:\n1. *Stocks: High risk, high return, long-term wealth building.\n2. **Mutual Funds: Diversified portfolios managed by professionals.\n3. **Bonds: Low-risk, fixed-income securities.\n4. **Real Estate: Passive income through rental properties.\n5. **Retirement Accounts: 401(k), Roth IRA, pension plans.\n\nHow to Start Investing?\n- Assess your risk tolerance.\n- Diversify your investments.\n- Start with index funds for lower risk.\n- Invest consistently, even with small amounts."
      },
      {
        id: 4,
        title: "Understanding Stocks and Bonds",
        excerpt: "A beginner’s guide to stocks and bonds.",
        content: "Stocks:\n- Represent ownership in a company.\n- Provide potential for high returns but come with risks.\n- Traded on stock exchanges like NYSE and NASDAQ.\n\nBonds:\n- Loans given to a corporation or government in exchange for periodic interest payments.\n- Considered safer than stocks but offer lower returns.\n\nChoosing Between Stocks & Bonds:\n- Younger investors may prefer stocks for long-term growth.\n- Those nearing retirement may lean toward bonds for stability.\n- A balanced portfolio contains both."
      }
    ]
  },
  {
    section: "Saving & Debt Management",
    items: [
      {
        id: 5,
        title: "How to Build an Emergency Fund",
        excerpt: "Learn why an emergency fund is important and how to build one.",
        content: "An emergency fund is essential for financial security.\n\n*Steps to Build It:\n1. *Set a Savings Goal: Aim for 3-6 months' worth of expenses.\n2. **Automate Transfers: Schedule monthly contributions to your savings account.\n3. **Cut Unnecessary Expenses: Reallocate money from non-essential spending.\n4. **Use High-Interest Savings Accounts: Maximize the growth of your emergency fund.\n5. **Avoid Using It for Non-Emergencies: Keep it strictly for urgent financial needs."
      },
      {
        id: 6,
        title: "Strategies for Paying Off Debt",
        excerpt: "Effective ways to become debt-free faster.",
        content: "Debt can be overwhelming, but with a solid plan, you can regain control.\n\n*Debt Repayment Strategies:\n1. *Snowball Method: Pay off the smallest debt first for motivation.\n2. **Avalanche Method: Focus on high-interest debt to save money.\n3. **Consolidation: Combine multiple debts into a single loan with a lower interest rate.\n4. **Negotiate with Creditors: Request lower interest rates or better terms.\n5. **Increase Income: Take up side hustles or freelance work to accelerate debt repayment."
      }
    ]
  }
];

const FinancialBlog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Financial Advice for Women</h1>
      {blogs.map((section) => (
        <div key={section.section} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.section}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((blog) => (
              <Card key={blog.id} className="p-4 shadow-lg rounded-xl">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600">{blog.excerpt}</p>
                  <Button className="mt-4" onClick={() => setSelectedBlog(blog)}>Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {selectedBlog && (
        <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
          <DialogContent className="max-w-lg mx-auto p-6">
            <DialogHeader>
              <DialogTitle>{selectedBlog.title}</DialogTitle>
            </DialogHeader>
            <p className="text-gray-700 mt-2 whitespace-pre-line">{selectedBlog.content}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FinancialBlog;