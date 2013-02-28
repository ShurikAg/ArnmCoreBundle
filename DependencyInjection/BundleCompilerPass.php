<?php
namespace Arnm\CoreBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
/**
 * This is a custom made compiler pass to load all the bundles info
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 * @copyright Copyright (c) 2013, IIB Solutions Ltd.
 */
class BundleCompilerPass implements CompilerPassInterface
{

    /**
     * {@inheritdoc}
     * @see Symfony\Component\DependencyInjection\Compiler.CompilerPassInterface::process()
     */
    public function process(ContainerBuilder $container)
    {
        if (! $container->hasDefinition('arnm_core.bundle_info_collector')) {
            return;
        }

        $definition = $container->getDefinition('arnm_core.bundle_info_collector');

        $taggedObjects = $container->findTaggedServiceIds('arnm_core.bundle_info');
        foreach ($taggedObjects as $id => $attributes) {
            $definition->addMethodCall('register', array(
                new Reference($id)
            ));
        }
    }
}
