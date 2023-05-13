import {
  BasicRow,
  Button,
  CategoryForm,
  ColorsButton,
} from '@ltpx-frontend-apps/shared-ui';
import styles from './category-page.module.scss';
import { Dialog } from 'evergreen-ui';
import { useCallback, useEffect, useState } from 'react';
import { useAdmin } from '@ltpx-frontend-apps/store';
import { CategoryModel, Category } from '@ltpx-frontend-apps/api';

/* eslint-disable-next-line */
export interface CategoryPageProps {}

export function CategoryPage(props: CategoryPageProps) {
  const [category, setCategory] = useState<CategoryModel>();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { _getCategories, _addCategory, _removeCategory, _updateCategory } =
    useAdmin();

  const addCategory = async (params: Category) => {
    const { success, data, error } = await _addCategory(params);
    if (success) {
      setCategory(data);
      console.log(data);
    } else {
      console.log(error);
    }
  };

  async function removeCategory(categoryId: number) {
    const { success, error } = await _removeCategory(categoryId);
    if (success) {
      console.log(success);
    } else {
      console.log(error);
    }
  }

  async function UpdateCategory(params: Category) {
    const paramsWithId = { ...params, ...{ id: category?.id } };
    const { success, error } = await _updateCategory(paramsWithId);
    if (success) {
      console.log(success);
    } else {
      console.log(error);
    }
  }

  const fetchCategories = useCallback(async () => {
    const { success, data, error } = await _getCategories();
    if (success) {
      setCategories(data);
    } else {
      console.log('error: ', error);
    }
    console.log('resp....: ', data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Categorías</h1>
      <div className={styles['actions-btn']}>
        <Button
          title="Agregar Categoría"
          color={ColorsButton.secondary}
          icon="plus"
          onClick={() => {
            setCategory(undefined);
            setOpenModal(true);
          }}
        />
      </div>
      <div className={styles['all-categories']}>
        <h4 className={styles['title-form']}>Todas las categorías</h4>
        <div className={styles['categories-content']}>
          {categories.map((category, index) => (
            <div key={index}>
              <BasicRow
                onClick={() => {
                  setCategory(category);
                  setOpenModal(true);
                }}
                title={category.name}
                subtitle={category.slug}
                remove={() => {
                  removeCategory(category.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Dialog
        isShown={openModal}
        hasFooter={false}
        title={category?.id ? 'Editar Categoría' : 'Nueva Categoría'}
        onCloseComplete={() => setOpenModal(false)}
      >
        <CategoryForm
          onSave={(params) => {
            if (category?.id) {
              UpdateCategory(params);
              setCategory(undefined);
            } else {
              addCategory(params);
            }
          }}
          onClose={() => setOpenModal(false)}
          category={category}
        />
      </Dialog>
    </div>
  );
}

export default CategoryPage;
