import React, { useState } from "react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is Opinion Vault?",
      answer:
        "Opinion Vault is a platform that allows users to review and share their opinions on various services. Whether you're looking for feedback on a service or want to contribute your own experiences, Opinion Vault makes it easy to connect with others and help them make informed decisions.",
    },
    {
      question: "How can I submit a review?",
      answer:
        "To submit a review, you need to create an account on Opinion Vault and log in. Once you're logged in, you can search for the service you want to review, click on the service page, and submit your review with a rating and your comments.",
    },
    {
      question: "How can I update or delete my review?",
      answer:
        "You can easily update or delete your review by going to your profile and navigating to the 'My Reviews' section. There, you’ll find all the reviews you've submitted. Each review will have options to update or delete it. Please note that once deleted, a review cannot be recovered.",
    },
    {
      question: "Can I rate a service without writing a review?",
      answer:
        "Yes! If you prefer to just rate a service without writing a detailed review, you can do so by selecting the rating (from 1 to 5 stars) and submitting it. However, writing a detailed review is encouraged to help others make informed decisions.",
    },
    {
      question: "How are services listed on Opinion Vault?",
      answer:
        "Services listed on Opinion Vault come from various providers, and each service page includes detailed descriptions, ratings, reviews, and more. Services are listed based on popularity and user ratings, ensuring that the best-rated services are easy to find.",
    },
    {
      question: "Can I trust the reviews on Opinion Vault?",
      answer:
        "Yes, all reviews on Opinion Vault are submitted by verified users, and we take strong measures to prevent spam or fraudulent reviews. We encourage our community to report any suspicious activity, and all reported reviews will be thoroughly investigated.",
    },
    {
      question: "How do I contact Opinion Vault support?",
      answer:
        "If you need help, you can reach our support team by visiting the 'Contact Us' page on our website. You can send us an email or use the live chat feature for immediate assistance.",
    },
    {
      question: "Is my personal data safe on Opinion Vault?",
      answer:
        "Yes, your privacy and data security are our top priorities. Opinion Vault uses advanced encryption to protect your personal information. We will never share your details without your consent, and you can review our privacy policy for more information.",
    },
    {
      question: "Can I use Opinion Vault for business purposes?",
      answer:
        "Yes, businesses can use Opinion Vault to collect reviews from customers. By creating a business profile, you can engage with users, gather feedback, and improve your service offerings based on customer insights.",
    },
    {
      question: "Do I need to pay to use Opinion Vault?",
      answer:
        "No, Opinion Vault is free to use for both users submitting reviews and businesses receiving feedback. However, we do offer premium features for businesses who want enhanced analytics or greater visibility on the platform.",
    },
  ];

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
