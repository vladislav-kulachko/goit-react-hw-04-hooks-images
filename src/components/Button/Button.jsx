import s from './Button.module.scss';
export default function Button({status, handlerPageIncrement}) {
  return (
    <>
      {status === 'resolved' && (
        <div className={s.container}>
          <button onClick={handlerPageIncrement} className={s.button}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}
