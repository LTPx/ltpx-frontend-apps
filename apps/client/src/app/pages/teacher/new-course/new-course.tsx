import { Button, ColorsButton, Input, Select } from '@ltpx-frontend-apps/shared-ui';
import styles from './new-course.module.scss';

/* eslint-disable-next-line */
export interface NewCourseProps {}

const optionsSave = [
  {value: 'draff', text: 'Borrador'},
  {value: 'public', text: 'Publicar'},
];

const categories = [
  {value: 'design', text: 'Design'},
  {value: 'business', text: 'Business'},
  {value: 'software-development', text: 'Software Development'},
  {value: 'personal-development', text: 'Personal Development'},
  {value: 'photography', text: 'Photography'},
  {value: 'audio', text: 'Audio + Music'},
  {value: 'marketing', text: 'Marketing'},
  {value: 'finance', text: 'Finance Accounting'},
];

const levels = [
  {value: 'begginer', text: 'Basico'},
  {value: 'medium', text: 'Intermedio'},
  {value: 'advance', text: 'Avanzado'},
];

const languages = [
  {value: 'es', text: 'Español'},
  {value: 'en', text: 'Ingles'},
];
export function NewCourse(props: NewCourseProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>Crear Curso</h3>
        <div className={styles['actions']}>
          <h5 className='muted'>Creado: Diciembre 21 2022</h5>
          <Button title='Preview' outline={true}/>
          <Select options={optionsSave} />
          <Button title='Save' color={ColorsButton.primary}/>
        </div>
      </div>
      <div className={styles['content']}>
        <div className={styles['text']}>
          <h2>Informacion General</h2>
          <h4 className='muted'>Esta informacion atraera usuarios a tomar este curso</h4>
        </div>
        <section className={styles['text']}>
          <h3>Portada del curso</h3>
          <div className={styles['upload-media']}>
            Agregue aqui su imagen o video
          </div>
        </section>
        <div className={styles['text']}>
          <Input placeholder='Evita nombres confusos' label='Nombre del curso'/>
          <Input placeholder='Un breve resumen de lo que trata este curso' label='Descripcion del curso'/>
        </div>
        <div className={styles['selects-form']}>
          <Select options={categories} label='Categoria'/>
          <Select options={levels} label='Nivel'/>
          <Select options={languages} label='Idioma'/>
        </div>
        <div className={styles['text']}>
          <Input placeholder='Pueden se puntos claves del curso' label='Que aprenderan los estudiantes?'/>
          <Input placeholder='Los estudiantes necesitan algun recurso antes de tomar este curso' label='Requerimietos'/>
        </div>
        <div className={styles['text']}></div>
      </div>
    </div>
  );
}

export default NewCourse;
