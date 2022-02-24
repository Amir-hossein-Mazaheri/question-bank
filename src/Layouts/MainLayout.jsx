function MainLayout({ sidebar, content }) {
  return (
    <main className="flex overflow-hidden h-screen">
      <aside className="basis-3/12 h-screen grow">{sidebar}</aside>
      <section className="basis-9/12 h-screen grow">
        {content}
      </section>
    </main>
  );
}

export default MainLayout;
