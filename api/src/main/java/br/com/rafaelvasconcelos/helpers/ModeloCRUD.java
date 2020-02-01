package br.com.rafaelvasconcelos.helpers;

import java.util.List;
import java.util.Optional;

public interface ModeloCRUD<T> {

    public List<T> listar();

    public Optional<T> buscar(Long id);

    public T cadastrar(T t);

    public T atualizar(T t);

    default void remover(Long id) {

    }
}
