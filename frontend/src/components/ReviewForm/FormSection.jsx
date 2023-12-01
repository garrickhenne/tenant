const FormSection = ({ titleLabel, children, displayRow }) => {
  
  return (
    <section className='rounded-xl bg-transparent border-2 border-white min-w-[75%] flex-col'>
      <h3 className='p-4 font-medium text-xl text-left'>{ titleLabel }</h3>
      <hr className='h-[2px] bg-white' />
      <form action="" className={`p-7 flex gap-x-8 gap-y-5 ${displayRow ? 'flex-col' : 'flex-row'}`}>
        { children }
      </form>
    </section>
  );
};

export default FormSection;
