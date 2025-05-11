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
  return (
    <picture>
      {isHero && (
        <>
          <source
            media="(min-width: 1600px)"
            srcSet={`
              ${imageUrl}?width=2400 2400w,
              ${imageUrl}?width=2000 2000w,
              ${imageUrl}?width=1800 1800w
            `}
            sizes="100vw"
          />
          <source
            media="(min-width: 1300px)"
            srcSet={`
              ${imageUrl}?width=1600 1600w,
              ${imageUrl}?width=1400 1400w,
              ${imageUrl}?width=1200 1200w,
            `}
            sizes="100vw"
          />
        </>
      )}
      <source
        media="(min-width: 768px)"
        srcSet={`
          ${imageUrl}?width=1200 1200w,
          ${imageUrl}?width=1000 1000w,
          ${imageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 767px)"
        srcSet={`
          ${imageUrl}?width=1000 1000w,
          ${imageUrl}?width=900 900w,
          ${imageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 550px)"
        srcSet={`
          ${imageUrl}?width=900 900w,
          ${imageUrl}?width=800 800w
        `}
        sizes={sizes}
      />
      <source
        media="(max-width: 380px)"
        srcSet={`
          ${imageUrl}?width=800 800w,
          ${imageUrl}?width=700 700w,
          ${imageUrl}?width=600 600w
        `}
        sizes={sizes}
      />
      <img
        className={classNames}
        src={`${imageUrl}?width=750`}
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
