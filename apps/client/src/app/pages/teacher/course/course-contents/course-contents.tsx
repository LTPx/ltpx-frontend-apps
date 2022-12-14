import { Button, ColorsButton, FileUpload, Icon, Input } from '@ltpx-frontend-apps/shared-ui';
import { useState } from 'react';
import styles from './course-contents.module.scss';

/* eslint-disable-next-line */
export interface FormContent {
  title: string;
  description: string;
}

export interface CourseContentsProps {
  onChange: any;
}

export function CourseContents(props: CourseContentsProps) {
  const { onChange } = props;

  const contents: FormContent[] = [
    {
      title: '',
      description: '',
    }
  ];

  const [contentForms, setContentForms] = useState(contents);

  const addNewForm = () => {
    setContentForms([...contentForms,     {
      title: '',
      description: '',
    }])
  }

  const removeForm = (index: number) => {
    const forms = [...contentForms];
    forms.splice(index, 1);
    setContentForms(forms);
  }

  const handleInputChange = (e: { target: HTMLInputElement; }, index: number) => {
    const { name, value } = e.target;
    let forms = [...contentForms];
    if ( name === 'title') {
      forms[index][name] = value;
    }
    if ( name === 'description') {
      forms[index][name] = value;
    }
    onChange && onChange(forms);
    setContentForms(forms);
  };

  return (
    <div className={styles['contents']}>
      <div className={styles['header-text']}>
        <h2>Contenidos</h2>
        <h4 className='muted'>Agrega los contenidos que se impartiran en el desarrollo del curso</h4>
      </div>
      { contentForms.map((form, index)=> (
        <div className={styles['form-content']} key={index}>
          <div className={styles['remove-btn']} onClick={() => removeForm(index)}>
            <Icon icon='close' size={15}/>
          </div>
          <Input
            placeholder='Ejm: Introduccion'
            label='Titulo de esta seccion'
            value={form.title}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='title'
          />
          <Input
            placeholder='Descripcion de este contenido'
            label='Descripcion de esta seccion'
            value={form.description}
            onChange={(e: { target: HTMLInputElement; }) => handleInputChange(e, index)}
            name='description'
          />
        </div>
      )) }
      <Button
        title='+ Agregar otra seccion'
        onClick={addNewForm}
        color={ColorsButton.primary}
      />
    </div>
  );
}

export default CourseContents;
