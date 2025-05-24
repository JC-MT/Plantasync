const { VITE_IMAGE_CDN_URL } = import.meta.env;

interface Props {
  imageUrl: string;
  sizes: string;
  alt: string;
  isHero: boolean;
  classNames: string;
  loading: "lazy" | "eager";
  width: number;
  height: number;
  viewTransition: number | undefined;
}

export function Image({
  imageUrl,
  sizes,
  alt,
  isHero = false,
  classNames = "",
  loading = "lazy",
  width,
  height,
  viewTransition
}: Props) {
  const fullImageUrl = `${VITE_IMAGE_CDN_URL}${imageUrl}`;
  return (
    <picture>
      {isHero && (
        <>
          <source
            media="(min-width: 1600px)"
            srcSet={`
              ${fullImageUrl}?width=2400 2400w,
              ${fullImageUrl}?width=2000 2000w,
              ${fullImageUrl}?width=1800 1800w
            `}
            sizes="100vw"
          />
          <source
            media="(min-width: 1300px)"
            srcSet={`
              ${fullImageUrl}?width=1600 1600w,
              ${fullImageUrl}?width=1400 1400w,
              ${fullImageUrl}?width=1200 1200w,
            `}
            sizes="100vw"
          />
        </>
      )}
      <source
        media="(min-width: 768px)"
        srcSet={`
          ${fullImageUrl}?width=1200 1200w,
          ${fullImageUrl}?width=1000 1000w,
          ${fullImageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 767px)"
        srcSet={`
          ${fullImageUrl}?width=1000 1000w,
          ${fullImageUrl}?width=900 900w,
          ${fullImageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 550px)"
        srcSet={`
          ${fullImageUrl}?width=900 900w,
          ${fullImageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 380px)"
        srcSet={`
          ${fullImageUrl}?width=800 800w,
          ${fullImageUrl}?width=700 700w,
          ${fullImageUrl}?width=600 600w
        `}
        sizes={sizes}
      />
      <img
        className={classNames}
        src={`${fullImageUrl}?width=750`}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        style={{
          viewTransitionName: `${
            viewTransition ? `plant-image-${viewTransition}` : "none"
          }`
        }}
      />
    </picture>
  );
}
