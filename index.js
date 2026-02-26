window.addEventListener('DOMContentLoaded', () => {
	// Тексты для печати
	const createBlockLastText =
		'иметь мотивацию, время и силы на все творческие идеи!'
	const createBlockFirstText = 'а также \n' // если нужен перевод строки

	// Функция печати с защитой от повторов
	function uniqueTypeWriter(text, block, timeoutTime = 70, index = 0) {
		// Если уже печатали – выходим
		if (block.dataset.typed === 'true') return

		// При первом вызове очищаем блок от возможного содержимого
		if (index === 0) {
			block.innerHTML = ''
		}

		if (index < text.length) {
			block.innerHTML += text.charAt(index)
			setTimeout(
				() => uniqueTypeWriter(text, block, timeoutTime, index + 1),
				timeoutTime,
			)
		} else {
			// Печать завершена – ставим метку
			block.dataset.typed = 'true'
		}
	}

	// Наблюдатель за появлением блоков
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const block = entry.target
					block.classList.add('show')

					// Запускаем печать для нужных элементов внутри блока
					const textBlocks = block.querySelectorAll(
						'.creativity-block__text, .creativity-block__last-text',
					)

					textBlocks.forEach(el => {
						if (el.classList.contains('creativity-block__text')) {
							uniqueTypeWriter(createBlockFirstText, el, 100)
						} else if (el.classList.contains('creativity-block__last-text')) {
							uniqueTypeWriter(createBlockLastText, el, 100)
						}
					})

					// Отписываемся от блока, чтобы анимация не повторялась
					observer.unobserve(block)
				}
			})
		},
		{ threshold: 0.3 },
	)

	// Начинаем наблюдать за всеми блоками с классом appearance-block
	const observedBlocks = document.querySelectorAll('.appearance-block')
	console.log(observedBlocks)
	observedBlocks.forEach(el => observer.observe(el))
})
