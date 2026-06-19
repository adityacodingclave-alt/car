"use client";

import { useMemo, useState } from "react";
import Car360Viewer from "@/components/Car360Viewer";
import catalog from "@/data/car360-catalog.json";
import { getCar360Frames } from "@/lib/car360";
import "@/styles/car360-section.css";

interface CatalogColor {
  rgb: string;
  frameIndex: number;
  previewUrl: string;
}

interface CatalogModel {
  title: string;
  displayName: string;
  thumbUrl: string;
  vehicleUrl: string;
  colors: CatalogColor[];
}

interface CatalogCategory {
  name: string;
  models: CatalogModel[];
}

const categories = catalog as CatalogCategory[];

function parseRgb(rgb: string): string {
  return rgb.split("/")[0].trim();
}

export default function Car360Section() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeModelIndex, setActiveModelIndex] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);

  const activeCategory = categories[activeCategoryIndex];
  const activeModel = activeCategory.models[activeModelIndex];
  const activeColor =
    activeModel.colors[colorIndex] ?? activeModel.colors[0] ?? null;
  const isSingleModel = activeCategory.models.length === 1;

  const frames = useMemo(() => {
    if (!activeColor) return null;
    return getCar360Frames(activeModel.title, activeColor.frameIndex);
  }, [activeModel.title, activeColor]);

  const staticImageUrl = activeColor?.previewUrl ?? activeModel.vehicleUrl;

  const selectCategory = (index: number) => {
    setActiveCategoryIndex(index);
    setActiveModelIndex(index === 0 ? 1 : 0);
    setColorIndex(0);
  };

  const selectModel = (index: number) => {
    setActiveModelIndex(index);
    setColorIndex(0);
  };

  return (
    <section className="index-model-section">
      <div className="models-wrap">
        <div className="models-main">
          <ul className="car-tabs">
            {categories.map((category, index) => (
              <li
                key={category.name}
                className={`car-tab-item${index === activeCategoryIndex ? " active" : ""}`}
              >
                <button type="button" onClick={() => selectCategory(index)}>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="car-content">
            <ul
              className={`model-list${isSingleModel ? " model-list-single" : ""}`}
            >
              {activeCategory.models.map((model, index) => (
                <li
                  key={model.title}
                  className={`model-item${index === activeModelIndex ? " active-car" : ""}`}
                  style={{
                    width: `${100 / activeCategory.models.length}%`,
                  }}
                >
                  <button
                    type="button"
                    className="model-item-btn"
                    onClick={() => selectModel(index)}
                  >
                    <div className="model-name-wrap">
                      <span className="model-name-text">
                        {model.displayName}
                      </span>
                    </div>
                    {!isSingleModel && (
                      <div className="model-thumb-image-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={model.thumbUrl}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="img-fluid"
                        />
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="model-viewer-wrap">
              {frames ? (
                <Car360Viewer
                  key={`${activeModel.title}-${activeColor?.frameIndex ?? 0}`}
                  frames={frames}
                  alt={activeModel.displayName}
                  className="car-360-stage"
                />
              ) : (
                <div className="model-static-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={staticImageUrl}
                    alt={activeModel.displayName}
                    referrerPolicy="no-referrer"
                    className="img-fluid"
                  />
                </div>
              )}
            </div>

            {activeModel.colors.length > 0 && (
              <div className="model-color-wrap">
                <ul className="color-list">
                  {activeModel.colors.map((color, index) => (
                    <li key={index} className="color-item">
                      <button
                        type="button"
                        className={`color-icon${index === colorIndex ? " active" : ""}`}
                        onClick={() => setColorIndex(index)}
                        aria-label={`Color option ${index + 1}`}
                      >
                        <span
                          className="pie-color1"
                          style={{
                            backgroundColor: parseRgb(color.rgb),
                          }}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
