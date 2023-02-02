import {
  Button,
  ColorsButton,
  Input,
  Select,
  TypeButton,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './require-changes-application-form.module.scss';

/* eslint-disable-next-line */
export interface RequireChangesApplicationFormProps {
  id: number;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export function RequireChangesApplicationForm(
  props: RequireChangesApplicationFormProps
) {
  const { id, onCancel, onSubmit } = props;
  const options = [
    { text: 'Nombre', value: 'name' },
    { text: 'Teléfono', value: 'phone' },
    { text: 'Identificación frente', value: 'national_id_front' },
    { text: 'Identificación atrás', value: 'national_id_back' },
    { text: 'País', value: 'country' },
    { text: 'Ciudad', value: 'city' },
    { text: 'Experiencia', value: 'experience' },
    { text: 'Formación', value: 'degrees' },
    { text: 'Record Policial', value: 'police_record' },
    { text: 'Otro', value: 'other' },
  ];

  return (
    <div className={styles['container']}>
      <h3>Cambios Requeridos</h3>
      <Select
        options={options}
        label="Selecciona el campo que necesita cambios"
      />
      <Input
        label="Describe el problema"
        placeholder="Ejm: tu identificación no es valida"
      />
      <div className={styles['footer']}>
        <Button
          title="Cancelar"
          color={ColorsButton.white}
          onClick={() => {
            onCancel && onCancel();
          }}
        />
        <Button
          title="Solicitar cambios"
          onClick={() => {
            onSubmit && onSubmit();
          }}
        />
      </div>
    </div>
  );
}

export default RequireChangesApplicationForm;
