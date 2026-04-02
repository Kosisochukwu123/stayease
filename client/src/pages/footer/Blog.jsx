import './FooterPage.css';

const POSTS = [
  { tag: 'Travel guide', title: 'The ultimate weekend guide to Lagos Island', excerpt: 'From Bar Beach to Balogun market — how to spend 48 hours on Lagos Island like a local.', date: 'March 18, 2025', img: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7e09?w=600', read: '6 min read' },
  { tag: 'Food & culture', title: "Nigeria's best hotel restaurants ranked by our team", excerpt: 'We ate at 24 hotel restaurants across 6 cities so you don\'t have to. Here\'s where to go.', date: 'March 5, 2025', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600', read: '8 min read' },
  { tag: 'Tips', title: 'How to get the best hotel rates in Abuja', excerpt: 'Conference season pushes Abuja hotel prices up 40%. Here\'s exactly when and how to book.', date: 'February 20, 2025', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600', read: '4 min read' },
  { tag: 'Destination', title: 'Why Enugu deserves a spot on your travel list', excerpt: "Nigeria's Coal City is underrated. Nike Lake, Ngwo Pine Forest, and warm people await.", date: 'February 8, 2025', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', read: '5 min read' },
  { tag: 'Travel guide', title: 'Kano in 3 days: ancient city, modern comfort', excerpt: "The Kano Emirate Palace, Kurmi Market, and dye pits — plus where to stay without compromising comfort.", date: 'January 28, 2025', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600', read: '7 min read' },
  { tag: 'Business travel', title: 'The best hotels in Nigeria for corporate stays', excerpt: 'Fast WiFi, proper desks, and conference facilities. Our ranking of Nigeria\'s top business hotels.', date: 'January 15, 2025', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600', read: '5 min read' },
];

export default function Blog() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">StayEase Journal</p>
          <h1>Travel stories, guides & insider tips</h1>
          <p>Destination guides written by people who've actually been there. No filler, no sponsored fluff — just honest travel writing from across Africa.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-section">
          <h2>Latest stories</h2>
          <div className="fp-posts">
            {POSTS.map(p => (
              <div key={p.title} className="fp-post">
                <img src={p.img} alt={p.title} />
                <div className="fp-post-body">
                  <p className="fp-post-tag">{p.tag}</p>
                  <h4>{p.title}</h4>
                  <p>{p.excerpt}</p>
                  <p className="fp-post-meta">{p.date} · {p.read}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}