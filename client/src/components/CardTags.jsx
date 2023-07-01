import React, { useEffect, useState } from 'react'
import 'animate.css';

const CardTags = () => {
    const cards = [
        { title: "Online Support 24/7", tag: "Get instant help with product inquiries, order tracking, and more from our friendly team." },
        { title: "Fast and Reliable Shipping", tag: "Get your products delivered quickly to your doorstep for a seamless shopping experience." },
        { title: "Easy Returns and Exchanges", tag: "Hassle-free returns and exchanges for a convenient shopping experience." }
    ];

    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        const handleScroll = () => {
            const windowScroll = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;

            const visibleIndexes = cards.reduce((indexes, _, index) => {
                const cardElement = document.getElementById(`card-${index}`);
                const cardRect = cardElement.getBoundingClientRect();
                const cardTop = cardRect.top + windowScroll;

                if (cardTop < windowScroll + windowHeight) {
                    indexes.push(index);
                }

                return indexes;
            }, []);

            setVisibleCards(visibleIndexes);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();  

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container py-5">
            <div className="row">
                {cards.map((card, index) => (
                    <div
                        className={`col-md-4 mb-4 animate__animated ${visibleCards.includes(index) ? 'animate__fadeInLeft' : ''}`}
                        style={{ animationDelay: `${index * 200}ms` }}
                        key={index}
                        id={`card-${index}`}
                    >
                        <div className="card glass-card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text d-none d-md-block">{card.tag}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardTags