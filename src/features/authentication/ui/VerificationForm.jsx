export function VerificationForm({ code, inputRefs, onChange, onKeyDown, onPaste }) {
  return (
    <section className="verification-form" aria-labelledby="verification-title">
      <h2 id="verification-title">Введите код</h2>
      <p>Мы отправили код подтверждения на вашу почту</p>
      <div className="verification-code" onPaste={onPaste}>
        {code.map((value, index) => (
          <input
            key={index}
            ref={(element) => { inputRefs.current[index] = element }}
            value={value}
            onChange={(event) => onChange(index, event)}
            onKeyDown={(event) => onKeyDown(index, event)}
            inputMode="numeric"
            maxLength="1"
            aria-label={`Символ ${index + 1} из 5`}
          />
        ))}
      </div>
    </section>
  )
}
