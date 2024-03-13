import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';

export const BearPage = () => {
	return (
		<>
			<h1>Contador de Osos</h1>
			<p>Manejo de estado simple de Zustand</p>
			<hr />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
				<BlackBears />
				<PandaBears />
				<PolarBears />
				<BearsDisplay />
			</div>
		</>
	);
};

export const BlackBears = () => {
	const blackBears = useBearStore((state) => state.blackBears);
	const modifyBlackBearsPopulation = useBearStore((state) => state.modifyBlackBearsPopulation);

	return (
		<WhiteCard centered>
			<h2>Osos Negros</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => modifyBlackBearsPopulation(+1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {blackBears} </span>
				<button onClick={() => modifyBlackBearsPopulation(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};
export const PandaBears = () => {
	const pandaBears = useBearStore((state) => state.pandaBears);
	const modifyPandaBearsPopulation = useBearStore((state) => state.modifyPandaBearsPopulation);

	return (
		<WhiteCard centered>
			<h2>Osos Panda</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => modifyPandaBearsPopulation(+1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {pandaBears} </span>
				<button onClick={() => modifyPandaBearsPopulation(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};
export const PolarBears = () => {
	const polarBears = useBearStore((state) => state.polarBears);
	const modifyPolarBearsPopulation = useBearStore((state) => state.modifyPolarBearsPopulation);

	return (
		<WhiteCard centered>
			<h2>Osos Polares</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => modifyPolarBearsPopulation(+1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {polarBears} </span>
				<button onClick={() => modifyPolarBearsPopulation(-1)}>-1</button>
			</div>
		</WhiteCard>
	);
};

export const BearsDisplay = () => {
	const bears = useBearStore(useShallow((state) => state.bears));
	const doNothing = useBearStore((state) => state.doNothing);
	const addBears = useBearStore((state) => state.addBears);
	const clearBears = useBearStore((state) => state.clearBears);

	return (
		<WhiteCard>
			<button onClick={doNothing}>Do nothing</button>
			<button className='mt-2' onClick={addBears}>
				Add bears
			</button>
			<button className='mt-2' onClick={clearBears}>
				Clear bears
			</button>
			<pre>{JSON.stringify(bears, null, 2)}</pre>
		</WhiteCard>
	);

	/*
    El useShallow sirve para que zustand detecte si el una propiedad del store realmente cambio, si no cambio no se va a renederizar el componente
    En este caso el metodo do nothing retorna una nueva referencia del array bears pero con los mismo datos, si no tuviera el useShallow
    se renderizaria igual el componente, cosa que no seria necesaria.
  */
};
