export const ImagesGallery = ({
  title,
  data,
}: {
  title: string;
  data: Array<{ img: string; subtitle: string }>;
}) => {
  return (
    <>
      <h3 className="character-detail__gallery-title">{title}</h3>
      <div className="character-detail__images-gallery">
        {data.map((item, index) => (
          <div
            key={`${item.subtitle}-${index}`}
            className="character-detail__item"
          >
            <img
              className="character-detail__thumbnail"
              src={`${item.img}`}
              alt={item.subtitle}
            />
            <p className="character-detail__subtitle">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </>
  );
};
