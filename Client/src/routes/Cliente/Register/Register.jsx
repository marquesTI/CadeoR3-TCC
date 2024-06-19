
import '../Register/Register.css'
//npm install react-hook-form
import { useForm } from 'react-hook-form'

function Register() {


    const {register, handleSubmit,setValue,setFocus}= useForm();


    function buscarCep(e){
        //regex (/\D/g,'')
        const cep= e.target.value.replace(/\D/g,'');
        
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res)=> res.json())
        .then((dados)=> {
            setValue('rua',dados.logradouro);
            setValue('bairro',dados.bairro);
            setFocus('numero')
        });

    }

    return( 
        <>
        <form className="frmCep" onSubmit={handleSubmit}>
        <fieldset>
            <legend>Dados</legend>
            <p>
                CEP:
                <input type="text" {...register("cep")} onBlur={buscarCep}/>
            </p>
            <p>
                Rua:
                <input type="text" {...register("rua")}/>
            </p>
            <p>
                Bairro:
                <input type="text" {...register("bairro")}/>
            </p>
            <p>
                Numero:
                <input type="text" {...register("numero")}/>
            </p>
        </fieldset>

        </form>
        </>
    )
}


export default Register;
