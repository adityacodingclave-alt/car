"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomepageData, ModelCategory, VehicleModel } from "@/lib/api";
import { imageUrl } from "@/lib/constants";

interface HeaderProps {
  homepage: HomepageData;
  models: VehicleModel[];
  categories: ModelCategory[];
}

export default function Header({
  homepage,
  models,
  categories,
}: HeaderProps) {
  const [modelsOpen, setModelsOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) setMobileNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMobileNav = () => setMobileNavOpen(false);

  const modelsByCategory = categories.map((cat) => ({
    ...cat,
    models: models.filter((m) => m.categoryId === cat.id),
  }));

  return (
    <header className="site-header sticky">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand logo" href="/">
            <Image
              src={imageUrl(homepage.logo)}
              alt="BAIC UAE"
              width={160}
              height={45}
              className="img-fluid"
              priority
              unoptimized
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            aria-controls="navbarNav"
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${mobileNavOpen ? " show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav m-auto">
              <li
                className="nav-item dropdown spacedItems"
                onMouseEnter={() => setModelsOpen(true)}
                onMouseLeave={() => setModelsOpen(false)}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="dropdownMenuModels"
                  onClick={(e) => {
                    e.preventDefault();
                    setModelsOpen((open) => !open);
                  }}
                >
                  Models
                </Link>
                {modelsOpen && (
                  <div
                    className="dropdown-menu megamenu show"
                    aria-labelledby="dropdownMenuModels"
                  >
                    <div className="container">
                      {modelsByCategory.map((cat) => (
                        <div key={cat.id} className="carmodels-type">
                          <h4>{cat.name}</h4>
                          <div className="row">
                            {cat.models.map((model) => (
                              <div
                                key={model.id}
                                className="col col-4 col-sm-3 col-lg-2"
                              >
                                <Link
                                  className="modelbox"
                                  href={`/model/${model.name}`}
                                  onClick={closeMobileNav}
                                >
                                  <Image
                                    src={imageUrl(model.image1)}
                                    alt={model.name}
                                    width={120}
                                    height={80}
                                    unoptimized
                                  />
                                  <span>{model.name}</span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li className="nav-item dropdown spacedItems">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  onClick={closeMobileNav}
                >
                  Innovation
                </Link>
              </li>
              <li className="nav-item dropdown spacedItems">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  onClick={closeMobileNav}
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown spacedItems">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  onClick={closeMobileNav}
                >
                  Newsroom
                </Link>
              </li>
              <li className="nav-item dropdown spacedItems">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  onClick={closeMobileNav}
                >
                  Connect
                </Link>
              </li>
              <li className="nav-item navredhover spacedItems">
                <Link
                  className="nav-link navredhover"
                  href="/our-service"
                  onClick={closeMobileNav}
                >
                  Service
                </Link>
              </li>
              <li className="nav-item navredhover spacedItems">
                <a
                  className="nav-link navredhover"
                  href="https://www.baicglobal.com/worldwide"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileNav}
                >
                  Worldwide
                </a>
              </li>
            </ul>
            <div className="dropdown d-flex ms-auto">
              <button
                className="btn btn-transparent dropdown-toggle border-0"
                type="button"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
