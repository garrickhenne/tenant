const FormSection = ({ titleLabel, children, displayRow, icon, formClassName }) => {
  const Icon = icon;

  return (
    <section className={'min-w-[100%] flex-col'}>
      <h3 className='p-4 font-medium text-xl text-left'>
        <header className="flex flex-row items-center">
          {icon && <Icon />}{ titleLabel }
        </header>
      </h3>
      <hr className='h-[2px] bg-white' />
      <form action="" className={ formClassName || `p-7 flex gap-x-8 gap-y-5 ${displayRow ? 'flex-col' : 'flex-row'}`}>
        { children }
      </form>
    </section>
  );
};

export default FormSection;
