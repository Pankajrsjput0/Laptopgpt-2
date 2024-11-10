import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const genres = [
  { name: 'Fantasy', image: '/images/genres/fantasy.jpg' },
    { name: 'Horror', image: '/images/genres/horror.jpg' },
      { name: 'Mystery', image: '/images/genres/mystery.jpg' },
        { name: 'Adventure', image: '/images/genres/adventure.jpg' },
          { name: 'Romance', image: '/images/genres/romance.jpg' },
            { name: 'Sci-Fi', image: '/images/genres/scifi.jpg' }
            ];

            function GenreCarousel() {
              const settings = {
                  dots: true,
                      infinite: true,
                          speed: 500,
                              slidesToShow: 4,
                                  slidesToScroll: 1,
                                      autoplay: true,
                                          responsive: [
                                                {
                                                        breakpoint: 1024,
                                                                settings: {
                                                                          slidesToShow: 3,
                                                                                  }
                                                                                        },
                                                                                              {
                                                                                                      breakpoint: 600,
                                                                                                              settings: {
                                                                                                                        slidesToShow: 2,
                                                                                                                                }
                                                                                                                                      }
                                                                                                                                          ]
                                                                                                                                            };

                                                                                                                                              return (
                                                                                                                                                  <div className="genre-carousel-container">
                                                                                                                                                        <h2 className="carousel-title">Explore Genres</h2>
                                                                                                                                                              <Slider {...settings}>
                                                                                                                                                                      {genres.map((genre, index) => (
                                                                                                                                                                                <div key={index} className="genre-card">
                                                                                                                                                                                            <div className="genre-card-image">
                                                                                                                                                                                                          <img src={genre.image} alt={genre.name} />
                                                                                                                                                                                                                        <div className="genre-card-overlay">
                                                                                                                                                                                                                                        <h3>{genre.name}</h3>
                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                                                          </Slider>
                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                export default GenreCarousel;