<?php
namespace Arnm\CoreBundle\Tests\Entity;

use Arnm\CoreBundle\Entity\Entity;

class MockEntity extends Entity
{

    protected $paramA;
    protected $paramB;
    /**
     * @return the $paramA
     */
    public function getParamA()
    {
        return $this->paramA;
    }

    /**
     * @return the $paramB
     */
    public function getParamB()
    {
        return $this->paramB;
    }

    /**
     * @param field_type $paramA
     */
    public function setParamA($paramA)
    {
        $this->paramA = $paramA;
    }

    /**
     * @param field_type $paramB
     */
    public function setParamB($paramB)
    {
        $this->paramB = $paramB;
    }

}
/**
 * Entity test case.
 */
class EntityTest extends \PHPUnit_Framework_TestCase
{

    public function testArrayAccess()
    {
        $entity = new MockEntity();
        $entity['paramA'] = 'test1';
        $entity['paramB'] = 'test2';

        $this->assertEquals('test1', $entity['paramA']);
        $this->assertEquals('test2', $entity['paramB']);
        $this->assertTrue(isset($entity['paramB']));
        unset($entity['paramB']);
        $this->assertFalse(isset($entity['paramB']));
    }

    public function testToArray()
    {
        $entity = new MockEntity();
        $entity->setParamA('test1');
        $entity->setParamB('test2');

        $this->assertEquals(array('paramA' => 'test1', 'paramB' => 'test2'), $entity->toArray());
    }

    public function testToXml()
    {
        $entity = new MockEntity();
        $entity->setParamA('test1');
        $entity->setParamB('test2');

        $this->assertEquals('<?xml version="1.0"?>
<response><paramA>test1</paramA><paramB>test2</paramB></response>
', $entity->toXml());
    }

    public function testToJson()
    {
        $entity = new MockEntity();
        $entity->setParamA('test1');
        $entity->setParamB('test2');

        $this->assertEquals('{"paramA":"test1","paramB":"test2"}', $entity->toJson());
    }
}

