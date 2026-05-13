import { useRef, useState } from 'react';

export default function PhotoUpload({ onPhoto }) {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const loadFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      const img = new Image();
      img.onload = () => onPhoto(img, e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-2">
        📸 Photo de profil
      </label>

      <div
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files[0]); }}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${dragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'}`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => loadFile(e.target.files[0])}
        />

        {preview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow"
            />
            <span className="text-indigo-700 font-semibold text-sm">Photo chargée ✓</span>
            <span className="text-gray-400 text-xs">Cliquez pour changer</span>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">📷</div>
            <p className="text-gray-500 text-sm">Glissez ou cliquez pour choisir votre photo</p>
          </>
        )}
      </div>
    </div>
  );
}
