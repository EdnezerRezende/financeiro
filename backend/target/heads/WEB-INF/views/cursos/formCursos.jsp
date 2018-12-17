<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Cadastro de Cursos</title>
</head>
<body>
	<form action="/heads/cursos" method="post">
		<div>
			<label>Curso</label> <input type="text" name="nome" />
		</div>
		<div>
			<label>Descrição</label>
			<textarea rows="10" cols="20" name="descricao"></textarea>
		</div>
		<div>
			<label>Data do Curso</label> <input type="text" name="dataEvento" />
		</div>
		<div>
			<label>Local</label> <input type="text" name="local" />
		</div>
		<div>
			<label>Valor</label> <input type="text" name="valor" />
		</div>

		<button type="submit">Cadastrar</button>
	</form>
</body>
</html>