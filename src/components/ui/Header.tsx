function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Finance Pulse
      </h1>
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-full"></div>
      </div>
    </header>
  );
}

export default Header;
