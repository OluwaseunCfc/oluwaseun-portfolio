import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGalleryImages } from '../services/galleryService';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGalleryImages()
      .then((data) => setImages(data))
      .catch(() => setError('Could not load gallery right now.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <section className="gallery-page">
        <div className="text-center mb-5">
          <h1 className="section-heading">Gallery</h1>
          <p className="section-subheading">A look behind the scenes</p>
        </div>

        {loading && <p className="text-center projects-status">Loading gallery...</p>}
        {error && <p className="text-center projects-status">{error}</p>}

        {!loading && !error && (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {images.map((img) => (
              <div className="col" key={img.id}>
                <div className="gallery-item">
                  <img src={img.image} alt={img.caption || 'Gallery photo'} />
                  {img.caption && <p className="gallery-caption">{img.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <p className="text-center projects-status">No photos yet.</p>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Gallery;