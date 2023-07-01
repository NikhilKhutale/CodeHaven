import React from 'react'
import office from '../assets/office.jpg'

const About = () => {
    return (
        <>
            <section className="mt-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <h2>About Our Company</h2>
                            <p>Your Company is a leading e-commerce platform that provides high-quality products to customers worldwide. We offer a wide range of products, including electronics, fashion, home goods, and more.</p>
                            <p>At Your Company, we are committed to delivering exceptional value and a seamless shopping experience. Our team works tirelessly to source products from trusted suppliers and ensure fast and reliable shipping to your doorstep.</p>
                            <p>Your Company is a leading e-commerce platform that provides high-quality products to customers worldwide. We offer a wide range of products, including electronics, fashion, home goods, and more.</p>
                            <p>At Your Company, we are committed to delivering exceptional value and a seamless shopping experience. Our team works tirelessly to source products from trusted suppliers and ensure fast and reliable shipping to your doorstep.</p>
                        </div>
                        <div className="col-lg-6">
                            <img src="https://firebasestorage.googleapis.com/v0/b/blogposts-b619e.appspot.com/o/1688140473679office.jpg?alt=media&token=49ec7ac6-5f42-4af7-9d0a-ace480d27b1a" alt="Company" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            {/*<!-- Product or Service Offering Section-- >*/}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2>Our Product Offering</h2>
                    <p>We offer a wide range of products to cater to your needs. Whether you're looking for the latest gadgets, trendy fashion items, or stylish home decor, we've got you covered. Explore our diverse collection and find the perfect products for yourself or as gifts for your loved ones.</p>
                </div>
            </section>

            {/*<!--Company Values and Social Responsibility Section-- >*/}
            <section className="py-5">
                <div className="container">
                    <h2>Our Values and Social Responsibility</h2>
                    <p>At Your Company, we believe in conducting our business with integrity and transparency. Our core values guide our decision-making process and ensure that we prioritize customer satisfaction above all else.</p>
                    <p>We are also committed to social responsibility. We actively engage in initiatives that support the community and the environment. Through partnerships with charitable organizations and sustainable practices, we strive to make a positive impact on society.</p>
                </div>
            </section>

            {/*<!--FAQs Section-- >*/}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2>Frequently Asked Questions</h2>
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h3 className="accordion-header" id="faqHeading1">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro nisi facilis nesciunt quia dolorum eum velit labore ab obcaecati adipisci?
                                </button>
                            </h3>
                            <div id="faqCollapse1" className="accordion-collapse collapse show" aria-labelledby="faqHeading1" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia esse incidunt ipsam rerum eaque aperiam, provident quos maxime unde quod, excepturi delectus fugiat eligendi. Adipisci dignissimos necessitatibus fuga. Quia, corporis.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h3 className="accordion-header" id="faqHeading2">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos consequatur, voluptate id nesciunt ex?
                                </button>
                            </h3>
                            <div id="faqCollapse2" className="accordion-collapse collapse" aria-labelledby="faqHeading2" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum minus, eius similique explicabo veritatis perspiciatis tenetur architecto, enim reiciendis, accusantium velit magni cum pariatur fugit.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*<!--Visuals Section-- >
  <section className="py-5">
    <div className="container">
      <h2>Our Journey in Pictures</h2>
      <div className="row">
        <div className="col-md-4">
          <img src="path/to/image1.jpg" alt="Image 1" className="img-fluid mb-3">
        </div>
        <div className="col-md-4">
          <img src="path/to/image2.jpg" alt="Image 2" className="img-fluid mb-3">
        </div>
        <div className="col-md-4">
          <img src="path/to/image3.jpg" alt="Image 3" className="img-fluid mb-3">
        </div>
      </div>
    </div>
    </section>*/}

            {/*Contact Section*/}
            <section className="py-5 bg-light">
                <div className="container">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or inquiries, please don't hesitate to reach out to us. Our friendly customer support team is here to assist you.</p>
                    <ul className="list-unstyled">
                        <li><strong>Address:</strong> 123 Main St, City, State, Country</li>
                        <li><strong>Phone:</strong> +1 123-456-7890</li>
                        <li><strong>Email:</strong> info@yourcompany.com</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default About