import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import "./style.css";

const ThumbnailSlider = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div>
          <img
            src={data?.thumbnail}
            onError={(e) =>
              (e.target.src =
                "https://cdn.dummyjson.com/product-images/placeholder.jpg")
            }
          />
        </div>
      );
    },
  };

  return (
    <div className="thumbnail-slider">
      <Slider {...settings}>
        {data?.gallery?.map((url, ind) => {
          return (
            <div
              key={ind}
              className="aspect-square relative overflow-hidden w-full"
            >
              <img
                src={url}
                onError={(e) =>
                  (e.target.src =
                    "https://cdn.dummyjson.com/product-images/placeholder.jpg")
                }
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ThumbnailSlider;
