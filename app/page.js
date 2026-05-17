export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Ask Lenox
      </h1>

      <p style={{ fontSize: "20px", maxWidth: "700px" }}>
        Hillside at Lenox AI Concierge is now live.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          borderRadius: "16px",
          background: "#1f2937"
        }}
      >
        <p>✅ Parking Rules</p>
        <p>✅ Amenity Questions</p>
        <p>✅ HOA Guidance</p>
        <p>✅ Resident Support</p>
      </div>
    </main>
  );
}
