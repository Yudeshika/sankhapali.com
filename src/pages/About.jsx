import React from 'react'

const about = () => {
  return (
    <section id="about"
    className='mt-20 text-white h-screen'
    style={{ 
      backgroundImage: 'url(/images/bg-about.png)', 
      backgroundRepeat: 'no-repeat' 
    }}
    >
        <div className="container py-10 max-w-screen-lg mx-20">
            <div className="row">
                <div className="col-xs-12">
                    <div className="title  wow zoomIn animated">
                        <h1 className='text-3xl mb-10'>ABOUT ME !!</h1>
                        <span className="title line"></span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 text-center wow fadeInLeft animated align-middle content-center items-center">
                    <img src="/images/sanke.jfif" alt="Jane Doe" className="img-responsive portrait"/>
                </div>
                <div className="col-sm-6 wow fadeInRight animated">
                    <div className="about-text">
                        <p><strong>Custom Web Development Solutions:</strong> We specialize in Education, eLearning, Shopping Carts, Ecommerce, WooCommerce, and WordPress.</p>
                        <p><strong>Custom Software Solutions:</strong> Offering POS systems, payment gateways, digital menus, and custom solutions tailored to your needs.</p>
                        <p><strong>Education &amp; Programming Courses:</strong> Comprehensive courses in PHP, Java, Android, and more.</p>
                        <div className="signature text-right">
                            <img src="/images/signature.png" width="100" className="img-responsive" alt="Signature"/>
                        </div>
						<span>Sankhapali Hettige <br/> Full-Stack Developer / 3D Designer </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default about