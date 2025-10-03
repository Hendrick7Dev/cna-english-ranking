import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Carregar variáveis de ambiente PRIMEIRO
config({ path: '.env' });

// Usar SQL direto para evitar problemas de parsing do Drizzle
const sql = neon(process.env.DATABASE_URL!);

// Dados iniciais para atividades
const initialActivities = [
  { description: 'Web Lesson: On Time!', pointValue: 15 },
  { description: 'Web Lesson: Early Bird!', pointValue: 20 },
  { description: 'Web Lesson: Late Submission', pointValue: 5 },
  { description: 'Book Homework: On Time!', pointValue: 15 },
  { description: 'Book Homework: Early Bird!', pointValue: 20 },
  { description: 'Book Homework: Late Submission', pointValue: 5 },
  { description: 'Checking Out', pointValue: 20 },
  { description: 'Project Zone', pointValue: 20 },
  { description: 'Week Bonus', pointValue: 40 },
  { description: 'Web Lesson: High Score Bonus!', pointValue: 30 },
];

// Dados iniciais para estudantes
const initialStudents = [
  { name: 'Ana Clara', points: 35 },
  { name: 'Emanuel', points: 70 },
  { name: 'Enzo', points: 35 },
  { name: 'Henzo', points: 15 },
  { name: 'Louise', points: 35 },
  { name: 'Manuela Marques', points: 15 },
  { name: 'Manuella Madoglio', points: 35 },
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Verificar se já existem dados
    try {
      const existingActivities = await sql`SELECT COUNT(*) as count FROM point_activities`;
      const existingStudents = await sql`SELECT COUNT(*) as count FROM students`;

      if (existingActivities[0].count > 0 || existingStudents[0].count > 0) {
        console.log('⚠️  Dados já existem no banco:');
        console.log(`- Atividades: ${existingActivities[0].count}`);
        console.log(`- Estudantes: ${existingStudents[0].count}`);
        console.log('ℹ️  Para recriar os dados, limpe as tabelas primeiro');
        return;
      }
    } catch (error) {
      console.log('ℹ️  Erro ao verificar dados existentes, continuando com inserção...');
    }

    // Inserir atividades
    console.log('📚 Inserindo atividades...');
    let insertedActivitiesCount = 0;
    for (const activity of initialActivities) {
      try {
        await sql`
          INSERT INTO point_activities (description, point_value) 
          VALUES (${activity.description}, ${activity.pointValue})
        `;
        insertedActivitiesCount++;
        console.log(`✅ Inserida: ${activity.description}`);
      } catch (error) {
        console.log(`⚠️  Erro ao inserir ${activity.description}:`, error);
      }
    }
    console.log(`✅ ${insertedActivitiesCount} atividades inseridas`);

    // Inserir estudantes
    console.log('👥 Inserindo estudantes...');
    let insertedStudentsCount = 0;
    for (const student of initialStudents) {
      try {
        await sql`
          INSERT INTO students (name, points) 
          VALUES (${student.name}, ${student.points})
        `;
        insertedStudentsCount++;
        console.log(`✅ Inserido: ${student.name}`);
      } catch (error) {
        console.log(`⚠️  Erro ao inserir ${student.name}:`, error);
      }
    }
    console.log(`✅ ${insertedStudentsCount} estudantes inseridos`);

    // As entradas de pontos serão criadas pelo sistema quando necessário
    console.log('ℹ️  Entradas de pontos serão criadas via interface do sistema');

    console.log('🎉 Seed concluído com sucesso!');
    
    // Mostrar resumo
    const totalStudents = await sql`SELECT COUNT(*) as count FROM students`;
    const totalActivities = await sql`SELECT COUNT(*) as count FROM point_activities`;
    
    console.log('\n📊 Resumo do banco:');
    console.log(`- Estudantes: ${totalStudents[0].count}`);
    console.log(`- Atividades: ${totalActivities[0].count}`);
    console.log(`- Entradas de pontos: 0 (serão criadas via interface)`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Script de seed finalizado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro no script de seed:', error);
      process.exit(1);
    });
}

export { seedDatabase };

