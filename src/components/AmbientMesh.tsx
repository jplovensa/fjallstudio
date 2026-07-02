export default function AmbientMesh() {
  return (
    <div className="ambient-mesh">
      <div
        className="mesh-orb w-[600px] h-[600px] bg-blue-200 top-[-100px] left-[-100px]"
        style={{ animation: "blob 10s infinite alternate" }}
      />
      <div
        className="mesh-orb w-[500px] h-[500px] bg-purple-100 top-[20%] right-[-50px]"
        style={{ animation: "blob 10s infinite alternate", animationDelay: "2s" }}
      />
      <div
        className="mesh-orb w-[700px] h-[700px] bg-teal-100 bottom-[-200px] left-[20%]"
        style={{ animation: "blob 10s infinite alternate", animationDelay: "4s" }}
      />
    </div>
  );
}
