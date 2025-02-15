function Balance() {
  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Текущий баланс</h2>
      <p
        id="balance"
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">
        0 ₽
      </p>
    </div>
  );
}

export default Balance;
