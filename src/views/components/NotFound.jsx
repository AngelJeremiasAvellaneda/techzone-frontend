export default function NotFound({
  title = 'Contenido no disponible',
  message = 'No pudimos cargar la información en este momento.',
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md">{message}</p>
    </div>
  );
}
